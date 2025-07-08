import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableWorkout1733057967816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.workout
            ADD COLUMN unrealized boolean;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.workout
        DROP COLUMN unrealized;
    `);
  }
}
