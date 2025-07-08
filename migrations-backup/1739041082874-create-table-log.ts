import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLog1739041082874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             CREATE TABLE public.log (
               id integer NOT NULL,
               customer_id integer NOT NULL,
               type_log character varying,
               error_str character varying,
               error_message character varying,
               error_url character varying,
               created_at timestamp without time zone DEFAULT now() NOT NULL,
               updated_at timestamp without time zone DEFAULT now() NOT NULL,
               primary key (id),
               foreign key (customer_id) 
                 references public.customer (id)
                 ON DELETE CASCADE
           );
           
           CREATE SEQUENCE public.log_id_seq
               AS integer
               START WITH 1
               INCREMENT BY 1
               NO MINVALUE
               NO MAXVALUE
               CACHE 1;
               
           ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;
           
           ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);
       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS log;
    `);
  }
}
