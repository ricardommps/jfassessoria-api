import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTrainingFeedback1696791819240
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.training_feedback(
            id integer NOT NULL,
            finished_training_id integer NOT NULL,
            description_feedback character varying NOT NULL,
            paces varchar[],
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (finished_training_id) 
                references public.finished_training (id)
                ON DELETE CASCADE
        );

        CREATE SEQUENCE public.training_feedback_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
                    
        ALTER SEQUENCE public.training_feedback_id_seq OWNED BY public.training_feedback.id;
                
        ALTER TABLE ONLY public.training_feedback ALTER COLUMN id SET DEFAULT nextval('public.training_feedback_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.training_feedback;
    `);
  }
}
