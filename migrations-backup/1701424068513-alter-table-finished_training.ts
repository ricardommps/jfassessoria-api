import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinishedTraining1701424068513
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.finished_training ADD comments character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(``);
  }
}
