import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAnamnese1742826635292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
                ALTER TABLE public.anamnese ADD days_the_week_sports_consultancy character varying;
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.anamnese drop days_the_week_sports_consultancy;
        `);
  }
}
