import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinishedTrainingService } from '../finished-training/finished-training.service';
import { TrainingService } from '../training/training.service';
import { CreateTrainingFeedbackDto } from './dtos/createTrainingFeedback.dto';
import { TrainingFeedbackEntity } from './entities/training_feedback.entity';

@Injectable()
export class TrainingFeedbackService {
  constructor(
    @InjectRepository(TrainingFeedbackEntity)
    private readonly trainingFeedbackEntityRepository: Repository<TrainingFeedbackEntity>,

    @Inject(forwardRef(() => TrainingService))
    private readonly trainingService: TrainingService,

    @Inject(forwardRef(() => FinishedTrainingService))
    private readonly finishedTrainingService: FinishedTrainingService,
  ) {}

  async getAllTrainingFeedback(): Promise<TrainingFeedbackEntity[]> {
    return this.trainingFeedbackEntityRepository.find();
  }

  async findById(id: number): Promise<TrainingFeedbackEntity> {
    const trainingFeedback =
      await this.trainingFeedbackEntityRepository.findOne({
        where: {
          id: id,
        },
      });
    if (!trainingFeedback) {
      throw new NotFoundException(`TrainingFeedbackId: ${id} Not Found`);
    }
    return trainingFeedback;
  }

  async findByTrainingId(id: number): Promise<TrainingFeedbackEntity> {
    const trainingFeedback =
      await this.trainingFeedbackEntityRepository.findOne({
        where: {
          finishedTrainingId: id,
        },
      });

    return trainingFeedback;
  }

  async createTrainingFeedback(
    createTrainingFeedbackDto: CreateTrainingFeedbackDto,
  ): Promise<TrainingFeedbackEntity> {
    const finishedTraining = await this.finishedTrainingService.findById(
      createTrainingFeedbackDto.finishedTrainingId,
    );

    if (!finishedTraining) {
      throw new NotFoundException(
        `FinishedTrainingId: ${finishedTraining} Not Found`,
      );
    }

    finishedTraining.review = true;
    await this.finishedTrainingService.updateFinishedTraining(finishedTraining);

    return this.trainingFeedbackEntityRepository.save({
      ...createTrainingFeedbackDto,
    });
  }

  async updateTrainingFeedback(
    updateTrainingFeedbackDto: CreateTrainingFeedbackDto,
  ): Promise<TrainingFeedbackEntity> {
    const trainingFeedback = await this.findById(updateTrainingFeedbackDto.id);

    return this.trainingFeedbackEntityRepository.save({
      ...trainingFeedback,
      ...updateTrainingFeedbackDto,
    });
  }

  async viewedFeedback(id: number): Promise<TrainingFeedbackEntity> {
    const trainingFeedback = await this.findById(id);

    return this.trainingFeedbackEntityRepository.save({
      ...trainingFeedback,
      viewed: true,
    });
  }
}
