import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1709837079651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD heating character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training drop heating;
    `);
  }
}
