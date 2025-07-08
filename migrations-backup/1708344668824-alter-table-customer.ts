import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1708344668824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.customer alter column password drop not null;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
