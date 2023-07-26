import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1690281583144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE training ADD videos jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE training drop videos jsonb;
    `);
  }
}
