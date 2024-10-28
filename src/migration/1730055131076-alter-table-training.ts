import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1730055131076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.training ADD heating_order integer[];
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.training
        DROP heating_order;
    `);
  }
}
