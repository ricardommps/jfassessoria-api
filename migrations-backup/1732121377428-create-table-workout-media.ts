import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWorkoutMedia1732121377428
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE workout_media (
                media_id INT REFERENCES media (id) ON UPDATE CASCADE ON DELETE CASCADE,
                workout_id INT REFERENCES workout (id) ON UPDATE CASCADE ON DELETE CASCADE,
                CONSTRAINT workout_media_pkey PRIMARY KEY (media_id, workout_id)
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS workout_media;
          `);
  }
}
