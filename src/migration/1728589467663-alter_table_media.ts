import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMedia1728589467663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.media
            ALTER COLUMN instrucctions DROP NOT NULL;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.media
        ALTER COLUMN instrucctions SET NOT NULL;
      `);
  }
}
