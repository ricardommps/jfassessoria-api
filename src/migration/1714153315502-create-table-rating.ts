import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRating1714153315502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.rating (
            id integer NOT NULL,
            rating_app int,
            comments_rating_app character varying,
            rating_trainings int,
            comments_rating_trainings character varying,
            testimony character varying,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            customer_id INTEGER, 
            CONSTRAINT fk_customer FOREIGN KEY(customer_id) REFERENCES customer(id)
        );
       
        CREATE SEQUENCE public.rating_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
                        
        ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;
                    
        ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      drop table public.rating;
    `);
  }
}
