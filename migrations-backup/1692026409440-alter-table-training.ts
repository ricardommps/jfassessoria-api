import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1692026409440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      ALTER table public.training alter column published drop not null;
      ALTER table public.training RENAME datePublished TO date_published;
      ALTER table public.training alter column date_published drop not null;
      ALTER table public.training ADD videos jsonb;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
