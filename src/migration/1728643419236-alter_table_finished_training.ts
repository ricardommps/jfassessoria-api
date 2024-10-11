import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1728643419236
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.finished_training
            ADD COLUMN distance_in_meters NUMERIC(10, 2) NULL,
            ADD COLUMN duration_in_seconds NUMERIC(10, 2) NULL,
            ADD COLUMN pace_in_seconds NUMERIC(10, 2) NULL;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished_training
        DROP COLUMN distance_in_meters,
        DROP COLUMN duration_in_seconds,
        DROP COLUMN pace_in_seconds;
      `);
  }
}
