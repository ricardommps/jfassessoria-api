import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableNotification1728675530003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE public.notifications 
        ADD COLUMN updated_at timestamp without time zone DEFAULT now() NOT NULL;
      `);

    // Se quiser garantir que a coluna seja atualizada automaticamente na modificação de registros
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER update_notifications_updated_at
        BEFORE UPDATE ON public.notifications
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TRIGGER IF EXISTS update_notifications_updated_at ON public.notifications;
      `);

    await queryRunner.query(`
        DROP FUNCTION IF EXISTS update_updated_at_column;
      `);

    await queryRunner.query(`
        ALTER TABLE public.notifications 
        DROP COLUMN updated_at;
      `);
  }
}
