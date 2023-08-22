import { TrainingEntity } from '../entities/training.entity';

interface Video {
  title: string;
  url: string;
}

export class ReturnTrainingDto {
  id: number;
  name: string;
  description: string;
  coverPath: string;
  datePublished: Date;
  published: boolean;
  videos: Video[];

  constructor(training: TrainingEntity) {
    this.id = training.id;
    this.name = training.name;
    this.description = training.description;
    this.coverPath = training.coverPath;
    this.datePublished = training.datePublished;
    this.published = training.published;
    this.videos = training.videos
      ? training.videos.map((video) => video)
      : undefined;
  }
}
