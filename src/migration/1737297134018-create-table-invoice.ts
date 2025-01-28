import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInvoice1737297134018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.invoice (
               id integer NOT NULL,
               customer_id integer NOT NULL,
               invoice_number character varying NOT NULL,
               status character varying NOT NULL,
               description character varying NOT NULL,
               total_amount character varying NOT NULL,
               due_date timestamp without time zone,
               created_at timestamp without time zone DEFAULT now() NOT NULL,
               updated_at timestamp without time zone DEFAULT now() NOT NULL,
               primary key (id),
               foreign key (customer_id) 
                 references public.customer (id)
                 ON DELETE CASCADE
           );
           
           CREATE SEQUENCE public.invoice_id_seq
               AS integer
               START WITH 1
               INCREMENT BY 1
               NO MINVALUE
               NO MAXVALUE
               CACHE 1;
               
           ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.id;
           
           ALTER TABLE ONLY public.invoice ALTER COLUMN id SET DEFAULT nextval('public.invoice_id_seq'::regclass);
       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS invoice;
    `);
  }
}
