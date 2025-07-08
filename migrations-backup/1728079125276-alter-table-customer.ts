import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1728079125276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer ADD maritalStatus character varying;
        ALTER TABLE public.customer ADD zipCode character varying;
        ALTER TABLE public.customer ADD street character varying;
        ALTER TABLE public.customer ADD streetNumber character varying;
        ALTER TABLE public.customer ADD city character varying;
        ALTER TABLE public.customer ADD state character varying;
        ALTER TABLE public.customer ADD district character varying;
        ALTER TABLE public.customer ADD fatPercentage character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.customer;
    `);
  }
}
