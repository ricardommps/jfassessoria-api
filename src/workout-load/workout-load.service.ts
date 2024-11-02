import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { MediaEntity } from 'src/media/entities/media.entity';
import { DataSource } from 'typeorm';
import { WorkoutLoadEntity } from './entities/workout-load.entity';
import { WorkoutLoadRepository } from './workout-load.repository';

@Injectable()
export class WorkoutLoadService {
  private workoutLoadRepository: WorkoutLoadRepository;

  constructor(private readonly dataSource: DataSource) {
    this.workoutLoadRepository = new WorkoutLoadRepository(dataSource);
  }

  async getWorkoutLoadsByCustomerAndMedia(
    customerId: number,
    mediaId: number,
  ): Promise<WorkoutLoadEntity[]> {
    return this.workoutLoadRepository.findByCustomerAndMedia(
      customerId,
      mediaId,
    );
  }

  async createWorkoutLoad(
    customerId: number,
    mediaId: number,
    load: string,
  ): Promise<WorkoutLoadEntity> {
    const customer = await this.dataSource
      .getRepository(CustomerEntity)
      .findOne({ where: { id: customerId } });
    const media = await this.dataSource
      .getRepository(MediaEntity)
      .findOne({ where: { id: mediaId } });

    if (!customer || !media) {
      throw new Error('Customer or Media not found');
    }

    const workoutLoad = this.workoutLoadRepository.create({
      customer,
      media,
      load,
    });

    return this.workoutLoadRepository.save(workoutLoad);
  }
}
