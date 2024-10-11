import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNotification1728674016832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.notifications (
                id integer NOT NULL,
                recipient_id integer NOT NULL,
                title character varying NOT NULL,
                content text NOT NULL,
                read_at timestamp without time zone,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (recipient_id) 
                  references public.customer (id)
                  ON DELETE CASCADE
            );

            CREATE SEQUENCE public.notifications_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                        
            ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
                    
            ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.notifications;
    `);
  }
}
