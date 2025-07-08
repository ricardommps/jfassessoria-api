import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1732101958169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.program
        ADD COLUMN start_date timestamp without time zone;
    `);
    await queryRunner.query(`
        ALTER TABLE public.program
        ADD COLUMN end_date timestamp without time zone;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.program
        DROP COLUMN start_date;
    `);
    await queryRunner.query(`
        ALTER TABLE public.program
        DROP COLUMN end_date;
    `);
  }
}
