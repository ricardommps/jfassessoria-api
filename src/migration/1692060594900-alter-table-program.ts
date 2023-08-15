import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1692060594900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE program ADD warning_pdf character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
