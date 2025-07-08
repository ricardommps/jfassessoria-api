import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1736330088492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.customer ADD COLUMN is_young_life boolean DEFAULT false;
    `);

    await queryRunner.query(`
        UPDATE public.customer
        SET is_young_life = false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a coluna
    await queryRunner.dropColumn('public.customer', 'is_young_life');
  }
}
