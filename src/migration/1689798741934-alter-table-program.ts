import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1689798741934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE program ADD test character varying;
        ALTER TABLE program ADD date_test timestamp without time zone;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    ALTER TABLE program drop test;
    ALTER TABLE program drop date_test;
`);
  }
}
