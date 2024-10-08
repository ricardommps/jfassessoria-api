import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAnamnese1728331995784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER table public.anamnese ADD read BOOLEAN NOT NULL DEFAULT FALSE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.anamnese drop read;
    `);
  }
}
