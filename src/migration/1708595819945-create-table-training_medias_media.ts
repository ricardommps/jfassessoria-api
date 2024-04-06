import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTrainingMediasMedia1708595819945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
          CREATE TABLE training_media (
              media_id int REFERENCES media (id) ON UPDATE CASCADE ON DELETE CASCADE,
              training_id int REFERENCES training (id) ON UPDATE CASCADE,
              CONSTRAINT media_training_pkey PRIMARY KEY (media_id, training_id) -- explicit pk
          );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
          drop table public.training_media;
      `);
  }
}
