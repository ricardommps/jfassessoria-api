import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1693304227103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD training_date_old timestamp without time zone;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training
        drop training_date_old;
    `);
  }
}
