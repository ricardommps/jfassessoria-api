import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1693393025582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.user ADD temporary_password boolean;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.user
            drop temporary_password;
    `);
  }
}
