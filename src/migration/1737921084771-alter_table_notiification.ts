import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableNotiification1737921084771
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE public.notifications ADD link character varying;
         `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.notifications
        DROP link;
    `);
  }
}
