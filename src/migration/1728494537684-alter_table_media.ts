import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMedia1728494537684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.media
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
