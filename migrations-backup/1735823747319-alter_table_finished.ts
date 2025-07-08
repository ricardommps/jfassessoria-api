import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1735823747319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.finished ALTER COLUMN check_list TYPE jsonb USING to_jsonb(check_list);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished
        DROP check_list;
    `);
  }
}
