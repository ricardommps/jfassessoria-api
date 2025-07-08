import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableWorkout1732129002707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.workout
        ADD COLUMN display_order integer;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.workout
        DROP COLUMN display_order;
    `);
  }
}
