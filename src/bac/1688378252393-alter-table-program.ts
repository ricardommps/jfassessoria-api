import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1688378252393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE program ADD active boolean NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE program drop active;
    `);
  }
}
