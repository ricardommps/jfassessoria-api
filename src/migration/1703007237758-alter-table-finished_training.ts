import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1703007237758
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.finished_training ADD unrealized BOOLEAN NOT NULL DEFAULT FALSE;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
