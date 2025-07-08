import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1711366575731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training ADD recovery character varying;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training drop recovery;
    `);
  }
}
