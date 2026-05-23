import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSummaryPolylineTableFinished1772194457491
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.finished
      ADD COLUMN summary_polyline TEXT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE public.finished
      DROP COLUMN summary_polyline;
    `);
  }
}
