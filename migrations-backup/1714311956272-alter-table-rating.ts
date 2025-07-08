import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableRating1714311956272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.rating ADD not_rating boolean;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.rating
        drop not_rating;
    `);
  }
}
