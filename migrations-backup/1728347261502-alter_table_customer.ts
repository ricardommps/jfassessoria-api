import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1728347261502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer ADD complement character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer drop complement;
    `);
  }
}
