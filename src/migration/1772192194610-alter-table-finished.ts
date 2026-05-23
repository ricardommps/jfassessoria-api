import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1772192194610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "public"."finished" 
        ADD COLUMN "linkstrava" character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      DROP COLUMN "linkstrava",
    `);
  }
}
