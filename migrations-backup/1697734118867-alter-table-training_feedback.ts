import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTrainingFeedback1697734118867
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training_feedback ADD viewed BOOLEAN NOT NULL DEFAULT FALSE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.training_feedback
            drop viewed;
    `);
  }
}
