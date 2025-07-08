import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1730317317917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Adiciona uma coluna temporária do tipo jsonb
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "heating_order_temp" jsonb`,
    );

    // 2. Copia os dados da coluna antiga para a nova coluna temporária
    await queryRunner.query(`
            UPDATE "training"
            SET "heating_order_temp" = to_jsonb("heating_order")
        `);

    // 3. Remove a coluna antiga
    await queryRunner.query(
      `ALTER TABLE "training" DROP COLUMN "heating_order"`,
    );

    // 4. Renomeia a coluna temporária para "heating_order"
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "heating_order_temp" TO "heating_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "heating_order_temp" integer[]`,
    );

    await queryRunner.query(`
            UPDATE "training"
            SET "heating_order_temp" = array(
                SELECT jsonb_array_elements_text("heating_order")::integer
            )
        `);

    await queryRunner.query(
      `ALTER TABLE "training" DROP COLUMN "heating_order"`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "heating_order_temp" TO "heating_order"`,
    );
  }
}
