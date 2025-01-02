import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { WorkoutEntity } from 'src/workout/entities/workout.entity';
import { WorkoutService } from 'src/workout/workout.service';
import { Repository } from 'typeorm';
import { FinishedEntity } from './entities/finished.entity';

@Injectable()
export class FinishedService {
  constructor(
    @InjectRepository(FinishedEntity)
    private readonly finishedEntity: Repository<FinishedEntity>,

    @Inject(forwardRef(() => WorkoutService))
    private readonly workoutService: WorkoutService,
  ) {}

  async getFinishedById(id: number): Promise<FinishedEntity> {
    return this.finishedEntity.findOne({
      where: { id },
    });
  }

  async findFinished(
    userId: number,
    timestampFrom: string,
    timestampTo: string,
  ) {
    const finishedTrainings = await this.finishedEntity
      .createQueryBuilder('finished')
      .select([
        'finished.*',
        'workout.name as trainingName',
        'workout.subtitle as trainingSubtitle',
        'workout.description as trainingDesc',
        'workout.date_published as trainingDatePublished',
        'workout.id as trainingId',
        'pro.name as programName',
        'pro.type as type',
        'pro.goal as goal',
        'pro.pv as pv',
        'pro.pace as programpace',
        'pro.difficulty_level as difficulty',
        'pro.reference_month as month',
        'pro.id as programId',
      ])
      .innerJoin(WorkoutEntity, 'workout', 'finished.workout_id = workout.id')
      .leftJoin(ProgramEntity, 'pro', 'workout.program_id = pro.id')
      .where('pro.customer_id = :customerId', { customerId: userId })
      .andWhere('finished.execution_day <= :timestampFrom', {
        timestampFrom: timestampFrom,
      })
      .andWhere('finished.execution_day > :timestampTo', {
        timestampTo: timestampTo,
      })
      .orderBy('finished.execution_day', 'DESC')
      .getRawMany(); // Retorna os resultados

    const formattedFinishedTrainings = finishedTrainings.map((finished) => {
      const formatted = {};
      Object.keys(finished).forEach((key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
          letter.toUpperCase(),
        ); // Converte para camelCase
        formatted[camelCaseKey] = finished[key];
      });
      return formatted;
    });

    return formattedFinishedTrainings;
  }

  async createFinished(createFinishedTrainingDto): Promise<FinishedEntity> {
    try {
      const workout = await this.workoutService.findWorkouById(
        createFinishedTrainingDto.workoutId,
      );
      workout.finished = true;
      workout.unrealized = createFinishedTrainingDto.unrealized;
      await this.workoutService.updateWorkoutFinished(workout);
      return this.finishedEntity.save({
        ...createFinishedTrainingDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async getUnreviewedFinished() {
    const finished = await this.finishedEntity
      .createQueryBuilder('finished')
      .leftJoinAndSelect('finished.workouts', 'workout') // Junção com a tabela workout
      .leftJoinAndSelect('workout.program', 'program') // Junção com a tabela program
      .leftJoinAndSelect('program.customer', 'customer') // Junção com a tabela customer
      .where('finished.review IS NULL OR finished.review = :review', {
        review: false,
      })
      .getMany();
    return finished.map((f) => ({
      id: f.id,
      workoutId: f.workoutId,
      distance: f.distance,
      duration: f.duration,
      pace: f.pace,
      link: f.link,
      rpe: f.rpe,
      trimp: f.trimp,
      review: f.review,
      executionDay: f.executionDay,
      comments: f.comments,
      feedback: f.feedback,
      unrealized: f.unrealized,
      intensities: f.intensities,
      outdoor: f.outdoor,
      unitMeasurement: f.unitMeasurement,
      typeWorkout: f.typeWorkout,
      distanceInMeters: f.distanceInMeters,
      durationInSeconds: f.durationInSeconds,
      paceInSeconds: f.paceInSeconds,
      checkList: f.checkList,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
      workout: {
        wokoutId: f.workouts?.id,
        name: f.workouts?.name,
        subtitle: f.workouts?.subtitle,
        running: f.workouts?.running,
      },
      customer: {
        id: f.workouts?.program?.customer?.id,
        name: f.workouts?.program?.customer?.name,
        email: f.workouts?.program?.customer?.email,
        phone: f.workouts?.program?.customer?.phone,
        avatar: f.workouts?.program?.customer?.avatar,
      },
    }));
  }

  async reviewWorkout(id: number, feedback: string): Promise<FinishedEntity> {
    try {
      const finished = await this.finishedEntity.findOne({
        where: {
          id: id,
        },
      });

      if (!finished) {
        throw new NotFoundException(`finished not found`);
      }

      await this.finishedEntity.save({
        ...finished,
        feedback: feedback,
        review: true,
      });

      return this.getFinishedById(id);
    } catch (error) {
      throw error;
    }
  }
}
