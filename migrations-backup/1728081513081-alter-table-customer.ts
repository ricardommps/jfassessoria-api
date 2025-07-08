import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCustomer1728081513081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.customer RENAME maritalStatus TO marital_status;
            ALTER TABLE public.customer RENAME zipCode TO zip_code;
            ALTER TABLE public.customer RENAME streetNumber TO street_number;
            ALTER TABLE public.customer RENAME fatPercentage TO fat_percentage;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.customer;
    `);
  }
}
