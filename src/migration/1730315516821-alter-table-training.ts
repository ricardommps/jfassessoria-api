import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTraining1730315516821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Cria uma nova coluna temporária de tipo jsonb
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" jsonb`,
    );

    // 2. Copia os dados da coluna antiga para a nova coluna como jsonb
    await queryRunner.query(`
        UPDATE "training" 
        SET "media_order_temp" = to_jsonb("media_order")
    `);

    // 3. Remove a coluna antiga
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);

    // 4. Renomeia a coluna temporária para o nome original
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter a operação ao contrário: cria uma coluna temporária integer[], copia os dados, remove a jsonb, renomeia a coluna
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" integer[]`,
    );

    await queryRunner.query(`
       UPDATE "training"
       SET "media_order_temp" = array(select jsonb_array_elements_text("media_order")::integer)
   `);

    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }
}
