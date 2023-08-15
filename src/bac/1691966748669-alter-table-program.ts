import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1691966748669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        alter table public.program ADD vla_level integer NOT NULL;
        alter table public.program ADD vlan_level integer NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
