import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1753381310852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "public"."finished" 
            ADD COLUMN "cool_down_duration" NUMERIC(8,3),
            ADD COLUMN "cool_down_intensities" NUMERIC(8,3),
            ADD COLUMN "warm_up_duration" NUMERIC(8,3),
            ADD COLUMN "warm_up_intensities" NUMERIC(8,3)
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "public"."finished" 
        DROP COLUMN "cool_down_duration",
        DROP COLUMN "cool_down_intensities", 
        DROP COLUMN "warm_up_duration",
        DROP COLUMN "warm_up_intensities"
      `);
  }
}
