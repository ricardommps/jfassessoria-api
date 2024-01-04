import { MediaEntity } from '../entities/media.entity';

export class ReturnMediaDto {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  instrucctions: string;
  blocked: boolean;
  constructor(mediaEntity: MediaEntity) {
    this.id = mediaEntity.id;
    this.title = mediaEntity.title;
    this.thumbnail = mediaEntity.thumbnail;
    this.videoUrl = mediaEntity.videoUrl;
    this.instrucctions = mediaEntity.instrucctions;
    this.blocked = mediaEntity.blocked;
  }
}
