import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableNotiification1737920701197
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           ALTER TABLE public.notifications ADD type character varying;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.notifications
        DROP type;
    `);
  }
}
