import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1692108694162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE program ADD fcm integer;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
