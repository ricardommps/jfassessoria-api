import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1743945198558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar a nova coluna workouts_id como UUID
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      ADD "workouts_id" uuid
    `);

    // Criar a foreign key para workouts_id
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      ADD CONSTRAINT "FK_finished_workouts_id" 
      FOREIGN KEY ("workouts_id") 
      REFERENCES "public"."workouts"("id") 
      ON DELETE CASCADE
    `);

    // Tornar workout_id opcional (remover NOT NULL se existir)
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      ALTER COLUMN "workout_id" DROP NOT NULL
    `);

    // Adicionar constraint para garantir que pelo menos um dos dois seja preenchido
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      ADD CONSTRAINT "CHK_finished_workout_or_workouts" 
      CHECK (
          ("workout_id" IS NOT NULL AND "workouts_id" IS NULL) OR 
          ("workout_id" IS NULL AND "workouts_id" IS NOT NULL)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a constraint de check
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      DROP CONSTRAINT "CHK_finished_workout_or_workouts"
    `);

    // Restaurar workout_id como NOT NULL (assumindo que todos os registros têm workout_id)
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      ALTER COLUMN "workout_id" SET NOT NULL
    `);

    // Remover a foreign key
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      DROP CONSTRAINT "FK_finished_workouts_id"
    `);

    // Remover a coluna workouts_id
    await queryRunner.query(`
      ALTER TABLE "public"."finished" 
      DROP COLUMN "workouts_id"
    `);
  }
}
