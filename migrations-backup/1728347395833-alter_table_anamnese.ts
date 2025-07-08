import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAnamnese1728347395833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.anamnese ADD disease character varying;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.anamnese drop disease;
    `);
  }
}
