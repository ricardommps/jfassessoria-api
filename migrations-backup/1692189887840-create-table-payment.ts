import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePayment1692189887840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.payment (
            id integer NOT NULL,
            user_id int NOT NULL,
            customer_id integer NOT NULL,
            start_date timestamp without time zone NOT NULL,
            expires_date timestamp without time zone NOT NULL,
            value decimal(16,2) NOT NULL,
            payment_date timestamp without time zone,
            comments character varying,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (user_id) 
            references public.user(id) 
            ON DELETE CASCADE,
            foreign key (customer_id) 
            references public.customer (id) 
            ON DELETE CASCADE
        );
        
        CREATE SEQUENCE public.payment_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
            
        ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;
        
        ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.payment;
    `);
  }
}
