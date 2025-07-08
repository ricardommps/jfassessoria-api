import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProgram1692022215356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.program (
                id integer NOT NULL,
                customer_id integer NOT NULL,
                name character varying NOT NULL,
                goal character varying,
                difficulty_level character varying NOT NULL,
                reference_month timestamp without time zone,
                pv character varying NOT NULL,
                pace character varying NOT NULL,
                vlan character varying NOT NULL,
                pace_vlan character varying NOT NULL,
                vla character varying NOT NULL,
                pace_vla character varying NOT NULL,
                active boolean NOT NULL,
                vla_level integer NOT NULL,
                vlan_level integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (customer_id) 
                  references public.customer (id)
                  ON DELETE CASCADE
            );
            
            CREATE SEQUENCE public.program_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.program_id_seq OWNED BY public.program.id;
            
            ALTER TABLE ONLY public.program ALTER COLUMN id SET DEFAULT nextval('public.program_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.program;
    `);
  }
}
