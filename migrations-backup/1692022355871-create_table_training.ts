import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTraining1692022355871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.training (
            id integer NOT NULL,
            program_id integer NOT NULL,
            name character varying NOT NULL,
            description character varying NOT NULL,
            cover_path character varying,
            datePublished timestamp without time zone NOT NULL,
            published boolean NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (program_id) 
                  references public.program (id)
                  ON DELETE CASCADE
        );

        CREATE SEQUENCE public.training_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
                    
        ALTER SEQUENCE public.training_id_seq OWNED BY public.training.id;
                
        ALTER TABLE ONLY public.training ALTER COLUMN id SET DEFAULT nextval('public.training_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    `);
  }
}
