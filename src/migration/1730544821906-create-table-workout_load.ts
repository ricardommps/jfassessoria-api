import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWorkoutLoad1730544821906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.workout_load (
                id integer NOT NULL,
                customer_id int NOT NULL,
                media_id int NOT NULL,
                load integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE,
                FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE
            );

            CREATE SEQUENCE public.workout_load_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.workout_load_id_seq OWNED BY public.workout_load.id;
            ALTER TABLE ONLY public.workout_load ALTER COLUMN id SET DEFAULT nextval('public.workout_load_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.workout_load;
        DROP SEQUENCE IF EXISTS public.workout_load_id_seq;
    `);
  }
}
