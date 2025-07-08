import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1693304734917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training RENAME training_date_old TO training_date_other;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
