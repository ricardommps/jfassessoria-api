import { MigrationInterface, QueryRunner } from 'typeorm';

export class MusclesWorked1768913099015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "muscles_worked" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "media_id" integer NOT NULL,
              "musclesId" integer[] NOT NULL,
              CONSTRAINT "PK_muscles_worked_id" PRIMARY KEY ("id"),
              CONSTRAINT "UQ_muscles_worked_media" UNIQUE ("media_id"),
              CONSTRAINT "FK_muscles_worked_media"
                FOREIGN KEY ("media_id")
                REFERENCES "media"("id")
                ON DELETE CASCADE
            )
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "muscles_worked"`);
  }
}
