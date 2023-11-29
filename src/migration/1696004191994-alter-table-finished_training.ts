import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1696004191994
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.finished_training RENAME reviw TO review;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
