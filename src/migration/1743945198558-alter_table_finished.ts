import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableFinished1743945198558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "finished" 
            ALTER COLUMN "execution_day" TYPE varchar USING "execution_day"::varchar;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "finished" 
        ALTER COLUMN "execution_day" TYPE timestamp USING "execution_day"::timestamp;
      `);
  }
}
