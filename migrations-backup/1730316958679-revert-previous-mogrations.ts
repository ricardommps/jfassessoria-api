import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevertPreviousMogrations1730316958679
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Cria uma coluna temporária como integer[]
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" integer[]`,
    );

    // 2. Converte e copia os dados da coluna `jsonb` para a coluna `integer[]`
    await queryRunner.query(`
        UPDATE "training" 
        SET "media_order_temp" = array(
            SELECT jsonb_array_elements_text("media_order")::integer
        )
    `);

    // 3. Remove a coluna `media_order` antiga do tipo `jsonb`
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);

    // 4. Renomeia a coluna temporária para `media_order`
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Para desfazer esta reversão, você pode criar novamente a coluna `jsonb`
    await queryRunner.query(
      `ALTER TABLE "training" ADD COLUMN "media_order_temp" jsonb`,
    );

    // Converte e copia os dados de volta para a coluna `jsonb`
    await queryRunner.query(`
       UPDATE "training" 
       SET "media_order_temp" = to_jsonb("media_order")
   `);

    // Remove a coluna `integer[]`
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "media_order"`);

    // Renomeia a coluna `media_order_temp` de volta para `media_order`
    await queryRunner.query(
      `ALTER TABLE "training" RENAME COLUMN "media_order_temp" TO "media_order"`,
    );
  }
}
