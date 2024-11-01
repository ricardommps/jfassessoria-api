import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1730394787123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "stretches_order_temp" jsonb`,
    );
    await queryRunner.query(`
                UPDATE "training"
                SET "stretches_order_temp" = to_jsonb("stretches_order")
            `);
    await queryRunner.query(
      `ALTER TABLE "training" DROP COLUMN "stretches_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "stretches_order_temp" TO "stretches_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "stretches_order_temp" integer[]`,
    );

    await queryRunner.query(`
                UPDATE "training"
                SET "stretches_order_temp" = array(
                    SELECT jsonb_array_elements_text("stretches_order")::integer
                )
            `);

    await queryRunner.query(
      `ALTER TABLE "training" DROP COLUMN "stretches_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "stretches_order_temp" TO "stretches_order"`,
    );
  }
}
