import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomers1692022065611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        alter table public.customer add unique(email);
        alter table public.customer alter column goal drop not null;
        alter table public.customer alter column expires_date drop not null;
        alter table public.customer alter column height drop not null;
        alter table public.customer alter column weight drop not null;
        alter table public.customer alter column phone drop not null;
        alter table public.customer alter column avatar drop not null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
