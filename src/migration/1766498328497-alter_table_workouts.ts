import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableWorkouts1766498328497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "public"."workouts" 
                ADD COLUMN "distance" NUMERIC(10,2);
              `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."workouts" 
            DROP COLUMN "distance",
          `);
  }
}
