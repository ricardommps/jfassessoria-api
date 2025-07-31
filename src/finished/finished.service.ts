import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { ProgramEntity } from 'src/program/entities/program.entity';
import { WorkoutEntity } from 'src/workout/entities/workout.entity';
import { WorkoutService } from 'src/workout/workout.service';
import { Repository } from 'typeorm';
import { FinishedEntity } from './entities/finished.entity';

type Formatted = {
  executionDay: string;
  distanceInKm: number;
  workoutId: number;
  [key: string]: any;
};

@Injectable()
export class FinishedService {
  constructor(
    @InjectRepository(FinishedEntity)
    private readonly finishedEntity: Repository<FinishedEntity>,

    @Inject(forwardRef(() => WorkoutService))
    private readonly workoutService: WorkoutService,

    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  async getFinishedById(id: number): Promise<FinishedEntity> {
    return this.finishedEntity.findOne({
      where: { id },
    });
  }

  async findFinished_old(
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
  async findFinished(
    userId: number,
    timestampFrom: string,
    timestampTo: string,
  ) {
    // Usando UNION para combinar ambas as consultas em uma única query
    const query = `
  SELECT 
    finished.*,
    training.name as "trainingName",
    training.subtitle as "trainingSubtitle",
    training.description as "trainingDesc",
    training.date_published as "trainingDatePublished",
    training.id as "trainingId",
    pro.name as "programName",
    pro.type as "type",
    pro.goal as "goal",
    pro.pv as "pv",
    pro.pace as "programpace",
    pro.difficulty_level as "difficulty",
    pro.reference_month as "month",
    pro.id as "programId"
  FROM finished
  INNER JOIN (
    SELECT 
      id::text as id, 
      name, 
      subtitle, 
      description, 
      date_published, 
      program_id, 
      'old' as source
    FROM workout
    UNION ALL
    SELECT 
      id::text as id, 
      title as name, 
      subtitle, 
      description, 
      date_published, 
      program_id, 
      'new' as source
    FROM workouts
  ) training ON (
    (finished.workout_id::text = training.id AND training.source = 'old') OR
    (finished.workouts_id::text = training.id AND training.source = 'new')
  )
  LEFT JOIN program pro ON training.program_id = pro.id
  WHERE pro.customer_id = $1
    AND finished.execution_day <= $2
    AND finished.execution_day > $3
  ORDER BY finished.execution_day DESC
`;

    const finishedTrainings = await this.finishedEntity.manager.query(query, [
      userId,
      timestampFrom,
      timestampTo,
    ]);

    // Formatação para camelCase
    const formattedFinishedTrainings = finishedTrainings.map((finished) => {
      const formatted = {};
      Object.keys(finished).forEach((key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
          letter.toUpperCase(),
        );
        formatted[camelCaseKey] = finished[key];
      });
      return formatted;
    });

    return formattedFinishedTrainings;
  }

  async findFinishedById_old(userId: number, id: number) {
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
      .andWhere('finished.id = :id', { id: id })
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

  async findFinishedById(userId: number, id: number) {
    const query = `
      SELECT 
        finished.*,
        training.name as "trainingName",
        training.subtitle as "trainingSubtitle",
        training.description as "trainingDesc",
        training.date_published as "trainingDatePublished",
        training.id as "trainingId",
        pro.name as "programName",
        pro.type as "type",
        pro.goal as "goal",
        pro.pv as "pv",
        pro.pace as "programpace",
        pro.difficulty_level as "difficulty",
        pro.reference_month as "month",
        pro.id as "programId"
      FROM finished
      INNER JOIN (
        SELECT 
          id::text as id, 
          name, 
          subtitle, 
          description, 
          date_published, 
          program_id, 
          'old' as source
        FROM workout
        UNION ALL
        SELECT 
          id::text as id, 
          title as name, 
          subtitle, 
          description, 
          date_published, 
          program_id, 
          'new' as source
        FROM workouts
      ) training ON (
        (finished.workout_id::text = training.id AND training.source = 'old') OR
        (finished.workouts_id::text = training.id AND training.source = 'new')
      )
      LEFT JOIN program pro ON training.program_id = pro.id
      WHERE pro.customer_id = $1
        AND finished.id = $2
      ORDER BY finished.execution_day DESC
    `;

    const finishedTrainings = await this.finishedEntity.manager.query(query, [
      userId,
      id,
    ]);

    const formattedFinishedTrainings = finishedTrainings.map((finished) => {
      const formatted = {};
      Object.keys(finished).forEach((key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
          letter.toUpperCase(),
        );
        formatted[camelCaseKey] = finished[key];
      });
      return formatted;
    });

    return formattedFinishedTrainings;
  }

  async findFinishedByIdNew(userId: number, id: string) {
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
      .andWhere('finished.id = :id', { id: id })
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

  async getUnreviewedFinished_() {
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

  async getUnreviewedFinished() {
    const query = `
      SELECT 
        finished.*,
        training.name as "trainingName",
        training.subtitle as "trainingSubtitle",
        training.description as "trainingDesc",
        training.date_published as "trainingDatePublished",
        training.id as "trainingId",
        training.source as "trainingSource",
        training.running as "trainingRunning",
        pro.name as "programName",
        pro.type as "type",
        pro.goal as "goal",
        pro.pv as "pv",
        pro.pace as "programpace",
        pro.difficulty_level as "difficulty",
        pro.reference_month as "month",
        pro.id as "programId",
        customer.id as "customerId",
        customer.name as "customerName",
        customer.email as "customerEmail",
        customer.phone as "customerPhone",
        customer.avatar as "customerAvatar"
      FROM finished
      INNER JOIN (
        SELECT 
          id::text as id, 
          name, 
          subtitle, 
          description, 
          date_published, 
          program_id, 
          running,
          'old' as source
        FROM workout
        UNION ALL
        SELECT 
          id::text as id, 
          title as name, 
          subtitle, 
          description, 
          date_published, 
          program_id, 
          running,
          'new' as source
        FROM workouts
      ) training ON (
        (finished.workout_id::text = training.id AND training.source = 'old') OR
        (finished.workouts_id::text = training.id AND training.source = 'new')
      )
      LEFT JOIN program pro ON training.program_id = pro.id
      LEFT JOIN customer ON pro.customer_id = customer.id
      WHERE finished.review IS NULL OR finished.review = false
      ORDER BY finished.execution_day DESC
    `;

    const results = await this.finishedEntity.manager.query(query);
    // Formatar para camelCase
    return results.map((row) => {
      const formatted: any = {};
      Object.keys(row).forEach((key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        formatted[camelKey] = row[key];
      });

      return {
        id: formatted.id,
        workoutId: formatted.workoutId || formatted.workoutsId,
        distance: formatted.distance,
        duration: formatted.duration,
        pace: formatted.pace,
        link: formatted.link,
        rpe: formatted.rpe,
        trimp: formatted.trimp,
        review: formatted.review,
        executionDay: formatted.executionDay,
        comments: formatted.comments,
        feedback: formatted.feedback,
        unrealized: formatted.unrealized,
        intensities: formatted.intensities,
        outdoor: formatted.outdoor,
        unitMeasurement: formatted.unitMeasurement,
        typeWorkout: formatted.typeWorkout,
        distanceInMeters: formatted.distanceInMeters,
        durationInSeconds: formatted.durationInSeconds,
        paceInSeconds: formatted.paceInSeconds,
        checkList: formatted.checkList,
        createdAt: formatted.createdAt,
        updatedAt: formatted.updatedAt,
        workout: {
          id: formatted.trainingId,
          name: formatted.trainingName,
          subtitle: formatted.trainingSubtitle,
          description: formatted.trainingDesc,
          datePublished: formatted.trainingDatePublished,
          source: formatted.trainingSource,
          running: formatted.trainingRunning,
        },
        customer: {
          id: formatted.customerId,
          name: formatted.customerName,
          email: formatted.customerEmail,
          phone: formatted.customerPhone,
          avatar: formatted.customerAvatar,
        },
      };
    });
  }

  async reviewWorkout(
    customerId,
    id: number,
    feedback: string,
  ): Promise<FinishedEntity> {
    try {
      const finished = await this.finishedEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!finished) {
        throw new NotFoundException(`finished not found`);
      }

      const finishedSave = await this.finishedEntity.save({
        ...finished,
        feedback: feedback,
        review: true,
      });
      if (customerId && finished) {
        const payloadNotification = {
          recipientId: customerId,
          title: 'Olá',
          content:
            'O feedback do seu último treino já está disponível! Vem ver!',
          type: 'feedback',
          link: finishedSave.id,
        };

        // const payloadNotification = {
        //   recipientId: customerId,
        //   title: 'Olä!',
        //   content:
        //     'O feedback do seu último treino já está disponível! Vem ver!',
        // };
        await this.notificationService.createNotification(payloadNotification);
      }

      return this.getFinishedById(id);
    } catch (error) {
      throw error;
    }
  }

  async getVolume(
    userId: number,
    programId: number,
    startDate: string,
    endDate: string,
  ) {
    // Primeiro, verificar se o programa pertence ao usuário
    const programOwnership = await this.finishedEntity
      .createQueryBuilder('finished')
      .select(['pro.customer_id'])
      .innerJoin('finished.workouts', 'workout')
      .leftJoin(ProgramEntity, 'pro', 'workout.program_id = pro.id')
      .where('workout.program_id = :programId', { programId })
      .limit(1)
      .getRawOne();

    // Se não encontrou o programa ou não pertence ao usuário, retorna 403
    if (!programOwnership || programOwnership.customer_id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // Adiciona o fim do dia no endDate
    const endDateTime = `${endDate} 23:59:59`;

    const finishedTrainings = await this.finishedEntity
      .createQueryBuilder('finished')
      .select([
        'finished.execution_day',
        'finished.distance_in_meters',
        'finished.workout_id',
      ])
      .innerJoin('finished.workouts', 'workout')
      .leftJoin(ProgramEntity, 'pro', 'workout.program_id = pro.id')
      .where('pro.customer_id = :customerId', { customerId: userId })
      .andWhere('workout.program_id = :programId', { programId })
      .andWhere('finished.execution_day >= :startDate', { startDate })
      .andWhere('finished.execution_day <= :endDateTime', { endDateTime })
      .andWhere('finished.unrealized = :unrealized', { unrealized: false })
      .andWhere('workout.running = :running', { running: true })
      .orderBy('finished.execution_day', 'ASC')
      .getRawMany();

    const formattedFinishedTrainings = finishedTrainings
      .map((finished) => {
        const formatted: Formatted = {} as Formatted;
        Object.keys(finished).forEach((key) => {
          const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) =>
            letter.toUpperCase(),
          );

          // Converter distanceInMeters para km (441 → 4.41 km)
          if (camelCaseKey === 'distanceInMeters') {
            formatted['distanceInKm'] = finished[key]
              ? parseFloat((finished[key] / 100).toFixed(2))
              : 0;
          } else {
            formatted[camelCaseKey] = finished[key];
          }
        });
        return formatted;
      })
      .sort(
        (a, b) =>
          new Date(b.executionDay).getTime() -
          new Date(a.executionDay).getTime(),
      );

    // Calcular a soma total das distâncias em km
    const totalDistanceInKm = finishedTrainings.reduce((sum, finished) => {
      const distance = finished.distance_in_meters
        ? finished.distance_in_meters / 100
        : 0;
      return sum + distance;
    }, 0);

    return {
      data: formattedFinishedTrainings,
      totalDistanceInKm: parseFloat(totalDistanceInKm.toFixed(2)),
    };
  }
}
