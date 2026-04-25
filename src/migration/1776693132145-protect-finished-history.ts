import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProtectFinishedHistory1776693132145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "finished"
        DROP CONSTRAINT IF EXISTS "FK_finished_workouts_id"
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        ADD CONSTRAINT "FK_finished_workouts_id"
        FOREIGN KEY ("workouts_id") REFERENCES "workouts"("id")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        DROP CONSTRAINT IF EXISTS "finished_workout_id_fkey"
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        ADD CONSTRAINT "finished_workout_id_fkey"
        FOREIGN KEY ("workout_id") REFERENCES "workout"("id")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "finished"
        DROP CONSTRAINT IF EXISTS "FK_finished_workouts_id"
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        ADD CONSTRAINT "FK_finished_workouts_id"
        FOREIGN KEY ("workouts_id") REFERENCES "workouts"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        DROP CONSTRAINT IF EXISTS "finished_workout_id_fkey"
      `);

    await queryRunner.query(`
        ALTER TABLE "finished"
        ADD CONSTRAINT "finished_workout_id_fkey"
        FOREIGN KEY ("workout_id") REFERENCES "workout"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION
      `);
  }
}
