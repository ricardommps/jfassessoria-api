import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1701369845271
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.finished_training ALTER COLUMN "distance" TYPE decimal(8,3);
        ALTER table public.finished_training ALTER COLUMN "duration" TYPE decimal(8,3);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
