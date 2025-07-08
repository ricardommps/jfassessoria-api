import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1709723449223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD media_order integer[];
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training drop media_order;
    `);
  }
}
