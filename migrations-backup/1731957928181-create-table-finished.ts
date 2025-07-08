import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFinished1731957928181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.finished(
          id integer NOT NULL,
          workout_id integer NOT NULL,
          distance numeric(8,3),
          duration numeric(8,3),
          pace character varying,
          link text,
          rpe integer,
          trimp character varying,
          review boolean,
          comments character varying,
          feedback character varying,
          unrealized boolean NOT NULL DEFAULT false,
          intensities character varying[],
          unitmeasurement character varying,
          type_workout character varying, -- Corrigido o espaço aqui
          distance_in_meters numeric(10,2),
          duration_in_seconds numeric(10,2),
          pace_in_seconds numeric(10,2),
          created_at timestamp without time zone DEFAULT now() NOT NULL,
          updated_at timestamp without time zone DEFAULT now() NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (workout_id) 
            REFERENCES public.workout (id)
            ON DELETE CASCADE
      );

      CREATE SEQUENCE public.finished_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
                  
      ALTER SEQUENCE public.finished_id_seq OWNED BY public.finished.id;
                  
      ALTER TABLE ONLY public.finished ALTER COLUMN id SET DEFAULT nextval('public.finished_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.finished;
    `);
  }
}
