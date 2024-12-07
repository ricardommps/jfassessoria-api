import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWorkout1731949242692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.workout(
                id integer NOT NULL,
                program_id integer NOT NULL,
                name character varying NOT NULL,
                description character varying,
                cover_path character varying,
                date_published timestamp without time zone,
                published boolean,
                hide boolean,
                running boolean DEFAULT false,
                workout_date_other timestamp without time zone,
                finished boolean,
                subtitle character varying,
                heating character varying,
                exercise_info jsonb,
                recovery character varying,
                tags text[] DEFAULT '{}',
                heating_order jsonb,
                stretches_order jsonb,
                media_order jsonb,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (program_id) 
                  references public.program (id)
                  ON DELETE CASCADE
            );

            CREATE SEQUENCE public.workout_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.workout_id_seq OWNED BY public.workout.id;
            ALTER TABLE ONLY public.workout ALTER COLUMN id SET DEFAULT nextval('public.workout_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table public.workout;
    `);
  }
}
