import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1692960016381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD hide boolean;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.training
                drop hide;
        `);
  }
}
