import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1692110700312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER table public.program RENAME fcm TO fcm_value;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
