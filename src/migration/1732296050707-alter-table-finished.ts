import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1732296050707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.finished
            ADD COLUMN execution_day timestamp without time zone;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished
        DROP COLUMN execution_day;
    `);
  }
}
