import { TrainingEntity } from '../entities/training.entity';

interface Video {
  title: string;
  url: string;
}

export class ReturnTrainingDto {
  id: number;
  name: string;
  subtitle: string;
  heating: string;
  recovery: string;
  description: string;
  coverPath: string;
  datePublished: Date;
  trainingDateOther: Date;
  published: boolean;
  hide: boolean;
  finished: boolean;
  videos: Video[];
  mediaOrder: number[];
  exerciseInfo: object[];

  constructor(training: TrainingEntity) {
    this.id = training.id;
    this.name = training.name;
    this.subtitle = training.subtitle;
    this.heating = training.heating;
    this.recovery = training.recovery;
    this.description = training.description;
    this.coverPath = training.coverPath;
    this.datePublished = training.datePublished;
    this.trainingDateOther = training.trainingDateOther;
    this.published = training.published;
    this.hide = training.hide;
    this.finished = training.finished;
    this.mediaOrder = training.mediaOrder;
    this.exerciseInfo = training.exerciseInfo
      ? training.exerciseInfo.map((item) => item)
      : undefined;
    this.videos = training.videos
      ? training.videos.map((video) => video)
      : undefined;
  }
}
