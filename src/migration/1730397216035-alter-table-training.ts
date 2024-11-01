import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1730397216035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" jsonb`,
    );
    await queryRunner.query(`
                    UPDATE "training"
                    SET "media_order_temp" = to_jsonb("media_order")
                `);
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" integer[]`,
    );

    await queryRunner.query(`
                    UPDATE "training"
                    SET "media_order_temp" = array(
                        SELECT jsonb_array_elements_text("media_order")::integer
                    )
                `);

    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }
}
