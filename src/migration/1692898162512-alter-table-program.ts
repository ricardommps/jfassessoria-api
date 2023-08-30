import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1692898162512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.program ADD hide boolean;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.program
                drop hide;
        `);
  }
}
