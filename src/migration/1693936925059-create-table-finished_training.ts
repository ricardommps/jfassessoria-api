import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFinishedTraining1693936925059
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.finished_training (
            id integer NOT NULL,
            training_id int NOT NULL,
            distance int NOT NULL,
            duration int NOT NULL,
            pace character varying NOT NULL,
            link text,
            rpe int NOT NULL,
            trimp character varying NOT NULL,
            reviw boolean,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (training_id) references public.training(id)
        );
        
        CREATE SEQUENCE public.finished_training_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                        
        ALTER SEQUENCE public.finished_training_id_seq OWNED BY public.finished_training.id;
                    
        ALTER TABLE ONLY public.finished_training ALTER COLUMN id SET DEFAULT nextval('public.finished_training_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.finished_training;
    `);
  }
}
