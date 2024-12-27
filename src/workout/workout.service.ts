import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaEntity } from 'src/media/entities/media.entity';
import { ProgramService } from 'src/program/program.service';
import { WorkoutLoadService } from 'src/workout-load/workout-load.service';
import { In, Repository } from 'typeorm';
import { WorkoutEntity } from './entities/workout.entity';

function isExpired(startDate: string, endDate: string): boolean {
  const currentDate = new Date();

  // Garantir que `endDate` seja tratado como o final do dia
  const parsedEndDate = new Date(endDate);
  const endOfDay = new Date(
    parsedEndDate.getFullYear(),
    parsedEndDate.getMonth(),
    parsedEndDate.getDate(),
    23,
    59,
    59,
    999, // Final do dia
  );

  // Retornar true se a data atual for maior que o final do dia de `endDate`
  return currentDate > endOfDay;
}

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,

    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,

    @Inject(forwardRef(() => ProgramService))
    private readonly programService: ProgramService,

    @Inject(forwardRef(() => WorkoutLoadService))
    private readonly workoutLoadService: WorkoutLoadService,
  ) {}

  async getTrainingById(id: number): Promise<WorkoutEntity> {
    const workouts = await this.workoutRepository.findOne({
      where: { id },
      relations: ['medias'],
    });
    return workouts;
  }

  async getTrainingByIdFeedback(id: number, customerId: number) {
    const workouts: any = await this.workoutRepository.findOne({
      where: { id },
      relations: ['medias'],
    });
    const { medias } = workouts;
    for (const media of medias) {
      if (media.id) {
        const workoutLoad =
          await this.workoutLoadService.getWorkoutLoadsByCustomerAndMedia(
            customerId,
            media.id,
          );
        media.workoutLoad = [...workoutLoad];
      }
    }
    return workouts;
  }

  async create(workout, mediasIds: number[]): Promise<WorkoutEntity> {
    try {
      const medias = await this.mediaRepository.findBy({ id: In(mediasIds) });
      if (medias.length !== mediasIds.length) {
        throw new Error('One or more medias not found');
      }
      return this.workoutRepository.save({
        ...workout,
        programId: workout.programId,
        medias: medias,
      });
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
  }

  async findWorkoutRunningByProgramId(
    programId: number,
  ): Promise<WorkoutEntity[]> {
    const workouts = await this.workoutRepository.find({
      where: {
        programId,
        running: true, // Filtrando onde running é true
      },
      relations: ['history'],
      order: { datePublished: 'ASC' },
    });

    return workouts;
  }

  async findWorkoutRunningByProgramIdUser(programId: number) {
    const program = await this.programService.findProgramById(programId);
    let expired = null;
    if (program.startDate && program.endDate) {
      expired = isExpired(
        program.startDate.toISOString(),
        program.endDate ? program.endDate.toISOString() : null,
      );
    }

    if (expired) {
      return {
        program,
        items: null,
        message: 'Seu planejamento acabou! Está na hora de evoluirmos.',
      };
    }

    const workoutsByProgram = await this.workoutRepository.find({
      where: {
        programId,
        running: true, // Filtrando onde running é true
        published: true, // Filtrando onde published é true
      },
      relations: ['history'],
      order: { datePublished: 'ASC' },
    });

    const workouts = {
      program,
      items: [...workoutsByProgram],
    };

    return workouts;
  }

  async findWorkoutGymByProgramIdUser(programId: number) {
    const program = await this.programService.findProgramById(programId);
    const expired = isExpired(
      program.startDate.toISOString(),
      program.endDate.toISOString(),
    );

    if (expired) {
      return {
        program,
        items: null,
        message: 'Seu planejamento acabou! Está na hora de evoluirmos.',
      };
    }

    const workoutsByProgram = await this.workoutRepository.find({
      where: {
        programId,
        running: false, // Filtrando onde running é true
        published: true, // Filtrando onde published é true
      },
      relations: ['history'],
      order: { displayOrder: 'ASC' },
    });

    const workouts = {
      program,
      items: [...workoutsByProgram],
    };

    return workouts;
  }

  async findWorkoutGymByProgramId_(
    programId: number,
  ): Promise<WorkoutEntity[]> {
    const workouts = await this.workoutRepository.find({
      where: {
        programId,
        running: false, // Filtrando onde running é true
        published: true, // Filtrando onde published é true
      },
      relations: ['history'],
      order: { displayOrder: 'ASC' },
    });

    return workouts;
  }

  async findWorkoutGymByProgramId(programId: number): Promise<WorkoutEntity[]> {
    const workouts = await this.workoutRepository
      .createQueryBuilder('workout')
      .leftJoinAndSelect('workout.history', 'history') // Relacionamento com a tabela history
      .where('workout.programId = :programId', { programId })
      .andWhere('workout.running = :running', { running: false }) // Filtrar por running

      .orderBy('workout.displayOrder', 'ASC') // Ordenar os workouts
      .addOrderBy('history.executionDay', 'DESC') // Ordenar a relação history por createdAt (ou qualquer outro campo)
      .getMany();

    return workouts;
  }

  async findWorkouById(id: number): Promise<WorkoutEntity> {
    const workout = await this.getTrainingById(id);
    return workout;
  }

  async findWorkouByIdFeedBack(id: number, customerId: number) {
    const workout = await this.getTrainingByIdFeedback(customerId, id);
    return workout;
  }

  async updateWorkout(
    id: number,
    workout: Partial<WorkoutEntity>,
  ): Promise<WorkoutEntity> {
    const medias = await this.mediaRepository.findBy({
      id: In(workout.medias),
    });
    if (medias.length !== workout.medias.length) {
      throw new Error('One or more medias not found');
    }
    await this.workoutRepository.save({
      ...workout,
      id: id,
      medias: medias,
    });
    return this.getTrainingById(id);
  }

  async updateWorkoutFinished(
    workout: Partial<WorkoutEntity>,
  ): Promise<WorkoutEntity> {
    return await this.workoutRepository.save({
      ...workout,
    });
  }

  async deleteWorkout(id: number): Promise<WorkoutEntity> {
    const workout = await this.getTrainingById(id);
    return await this.workoutRepository.remove(workout);
  }

  async sendWorkout(sendTrainingDto): Promise<any> {
    try {
      const { workoutId, programsId } = sendTrainingDto;
      const workout = await this.getTrainingById(workoutId);
      delete workout.id;
      workout.workoutDateOther = null;
      workout.published = false;
      workout.finished = false;
      workout.unrealized = false;
      await programsId.map(async (item) => {
        const saveTraining = {
          ...workout,
          programId: item,
        };
        await this.programService.findProgramById(saveTraining.programId);
        return this.workoutRepository.save({
          ...saveTraining,
        });
      });
      return {
        status: 200,
        message: 'Send Success',
      };
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
  }

  async cloneWorkout(id: number, qntCopy: number): Promise<WorkoutEntity[]> {
    try {
      const workout = await this.getTrainingById(id);
      delete workout.id;
      workout.datePublished = null;
      workout.workoutDateOther = null;
      workout.published = false;
      workout.finished = false;
      workout.unrealized = false;
      const features = [];
      for (let i = 0; i < qntCopy; i++) {
        features.push(workout);
      }
      return await this.workoutRepository.save(features);
    } catch (error) {
      throw new Error(`Error creating training: ${error.message}`);
    }
  }
}
