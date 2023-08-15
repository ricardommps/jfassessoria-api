import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCustomers1688067155287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.customer (
            id integer NOT NULL,
            user_id int NOT NULL,
            name character varying NOT NULL,
            email character varying NOT NULL,
            password character varying NOT NULL,
            goal character varying NOT NULL,
            type_user int NOT NULL,
            active boolean NOT NULL,
            is_runner boolean NOT NULL,
            is_strength boolean NOT NULL,
            expires_date timestamp without time zone NOT NULL,
            gender character varying NOT NULL,
            birth_date timestamp without time zone NOT NULL,
            height double precision NOT NULL,
            weight double precision NOT NULL,
            phone character varying NOT NULL,
            avatar character varying NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (user_id) references public.user(id)
        );
        
        CREATE SEQUENCE public.customer_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                        
        ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;
                    
        ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.customer;
    `);
  }
}
