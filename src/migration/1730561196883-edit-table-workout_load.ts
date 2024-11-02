import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditTableWorkoutLoad1730561196883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.workout_load
            ALTER COLUMN load TYPE character varying;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.workout_load
        ALTER COLUMN load TYPE integer;
    `);
  }
}
