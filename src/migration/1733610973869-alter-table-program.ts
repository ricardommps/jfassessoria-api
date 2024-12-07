import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1733610973869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.program
            ADD COLUMN vs2 boolean DEFAULT false
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.program
        DROP COLUMN vs2;
    `);
  }
}
