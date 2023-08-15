import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomers1688067399896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    alter table public.customer add unique(email);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
