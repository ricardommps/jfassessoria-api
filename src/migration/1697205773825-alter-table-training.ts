import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1697205773825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.training ADD finished BOOLEAN NOT NULL DEFAULT FALSE;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
