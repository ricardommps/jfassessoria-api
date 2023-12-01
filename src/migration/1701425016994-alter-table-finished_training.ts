import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1701425016994
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.finished_training ALTER COLUMN distance DROP NOT NULL;
        ALTER TABLE public.finished_training ALTER COLUMN duration DROP NOT NULL;
        ALTER TABLE public.finished_training ALTER COLUMN pace DROP NOT NULL;
        ALTER TABLE public.finished_training ALTER COLUMN rpe DROP NOT NULL;
        ALTER TABLE public.finished_training ALTER COLUMN trimp DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
