import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1700832868280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.program ALTER COLUMN pv DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN pace DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN vlan DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN pace_vlan DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN vla DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN pace_vla DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN vla_level DROP NOT NULL;
        ALTER TABLE public.program ALTER COLUMN vlan_level DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
