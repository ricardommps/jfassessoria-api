import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1713979930164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer ADD cloudinary_id character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.customer
                drop cloudinary_id;
    `);
  }
}
