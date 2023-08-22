import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePaymnt1692386579599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER table public.payment ADD due_date timestamp without time zone NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
