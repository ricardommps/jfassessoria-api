import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1735816860572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.finished ADD check_list integer[];
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.finished
        DROP check_list;
    `);
  }
}
