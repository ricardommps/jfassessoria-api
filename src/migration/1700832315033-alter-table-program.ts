import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1700832315033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.program ADD type integer;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.program
            drop type;
    `);
  }
}
