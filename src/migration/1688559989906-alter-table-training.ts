import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1688559989906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        alter table public.training alter column published drop not null;
        alter table public.training RENAME datePublished TO date_published;
        alter table public.training alter column date_published drop not null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
