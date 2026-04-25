import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1772018410330 implements MigrationInterface {
  name = 'AlterTableFinished1772018410330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adiciona coluna external_id
    await queryRunner.query(`
      ALTER TABLE "finished"
      ADD COLUMN "external_id" bigint
    `);

    // Adiciona coluna source
    await queryRunner.query(`
      ALTER TABLE "finished"
      ADD COLUMN "source" varchar
    `);

    // Índice único parcial (somente quando não for null)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_finished_external_id"
      ON "finished" ("external_id")
      WHERE "external_id" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_finished_external_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "finished"
      DROP COLUMN "external_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "finished"
      DROP COLUMN "source"
    `);
  }
}
