import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMetrics1699383574575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.metrics ADD type character varying;
        ALTER TABLE public.metrics ADD module character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
