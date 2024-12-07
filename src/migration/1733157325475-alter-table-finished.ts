import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1733157325475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished
        ADD COLUMN outdoor boolean DEFAULT true;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished
        DROP COLUMN outdoor;
    `);
  }
}
