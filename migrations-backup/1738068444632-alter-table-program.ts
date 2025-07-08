import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProgram1738068444632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.program ADD additional_information character varying;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.program
        DROP additional_information;
    `);
  }
}
