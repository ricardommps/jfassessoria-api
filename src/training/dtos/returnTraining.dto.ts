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
  trainingDateOther: Date;
  published: boolean;
  hide: boolean;
  finished: boolean;
  videos: Video[];

  constructor(training: TrainingEntity) {
    this.id = training.id;
    this.name = training.name;
    this.description = training.description;
    this.coverPath = training.coverPath;
    this.datePublished = training.datePublished;
    this.trainingDateOther = training.trainingDateOther;
    this.published = training.published;
    this.hide = training.hide;
    this.finished = training.finished;
    this.videos = training.videos
      ? training.videos.map((video) => video)
      : undefined;
  }
}
