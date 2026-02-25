import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableWorkouts1769363879810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."workouts" 
            ADD COLUMN "muscles_worked" boolean DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "public"."workouts" 
        DROP COLUMN "muscles_worked",
    `);
  }
}
