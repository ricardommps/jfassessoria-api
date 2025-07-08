import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1707135559595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD subtitle character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training
            drop subtitle;
    `);
  }
}
