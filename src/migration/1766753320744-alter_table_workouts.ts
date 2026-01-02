import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableWorkouts1766753320744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                    ALTER TABLE "public"."workouts" 
                    ADD COLUMN "link" character varying;
                  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "public"."workouts" 
                DROP COLUMN "link",
              `);
  }
}
