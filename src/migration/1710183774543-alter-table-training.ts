import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1710183774543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD exercise_info JSONB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training drop exercise_info;
    `);
  }
}
