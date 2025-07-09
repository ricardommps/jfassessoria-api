import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1752058895934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.customer
        ADD "admin_password" character varying NOT NULL DEFAULT '$2b$10$v/X6rMEaZnrBq2Es8NIgouUBbgAlYa8Auqts0lNJ9RJVQ0jk4X7/m'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.customer
        DROP COLUMN "admin_password"
    `);
  }
}
