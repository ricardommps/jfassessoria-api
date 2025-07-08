import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMetrics1699294529832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.metrics(
            id integer NOT NULL,
            customer_id integer NOT NULL,
            title character varying NOT NULL,
            chartData JSONB NOT NULL,
            view boolean NOT NULL DEFAULT FALSE,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (customer_id) 
            references public.customer (id) 
            ON DELETE CASCADE
        );
        
        CREATE SEQUENCE public.metrics_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                        
        ALTER SEQUENCE public.metrics_id_seq OWNED BY public.metrics.id;
                    
        ALTER TABLE ONLY public.metrics ALTER COLUMN id SET DEFAULT nextval('public.metrics_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.metrics;
    `);
  }
}
