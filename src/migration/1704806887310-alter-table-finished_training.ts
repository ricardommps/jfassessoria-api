import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1704806887310
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.finished_training ADD intensities varchar[];
        ALTER table public.finished_training ADD unitMeasurement character varying;
        ALTER table public.finished_training ADD typeTraining character varying;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
