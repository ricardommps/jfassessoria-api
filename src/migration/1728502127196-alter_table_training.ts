import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1728502127196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.training ADD stretches_order integer[];
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.training
        DROP stretches_order;
    `);
  }
}
