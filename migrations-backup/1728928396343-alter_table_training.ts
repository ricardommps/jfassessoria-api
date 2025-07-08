import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1728928396343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.training
            ADD COLUMN tags text[] DEFAULT '{}';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.media
        DROP COLUMN tags;
    `);
  }
}
