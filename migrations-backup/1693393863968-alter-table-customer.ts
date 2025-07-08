import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1693393863968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer ADD temporary_password boolean;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer
            drop temporary_password;
    `);
  }
}
