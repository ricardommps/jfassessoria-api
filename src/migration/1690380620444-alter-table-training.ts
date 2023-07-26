import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1690380620444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        alter table public.training ADD videos jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
