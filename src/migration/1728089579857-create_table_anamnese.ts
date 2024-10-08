import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAnamnese1728089579857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.anamnese (
              id SERIAL PRIMARY KEY,
              customer_id integer NOT NULL,
              has_diabetes_or_hypertension character varying NOT NULL,
              pain_or_injuries character varying NOT NULL,
              you_surgery character varying NOT NULL,
              heart_disease character varying NOT NULL,
              is_pregnant boolean NOT NULL,
              medications_or_supplements character varying NOT NULL,
              etilismo character varying NOT NULL,
              smoking character varying NOT NULL,
              food character varying NOT NULL,
              is_vegetarian boolean NOT NULL,
              is_vegan boolean NOT NULL,
              physical_activity character varying NOT NULL,
              intentions_starting_sports_consultancy character varying NOT NULL,
              looking_for_racing_advice character varying NOT NULL,
              running_experience character varying NOT NULL,
              strengthening_training character varying NOT NULL,
              running_competition_experience character varying NOT NULL,
              you_looking_for_race_consultancy character varying NOT NULL,
              running_events_future character varying NOT NULL,
              race_on_your_future_calendar character varying NOT NULL,
              days_of_the_week_run character varying NOT NULL, -- Corrigido o nome da coluna
              has_running_clock character varying NOT NULL,
              longest_running_distance character varying,
              best_running_time character varying,
              created_at timestamp without time zone DEFAULT now() NOT NULL,
              updated_at timestamp without time zone DEFAULT now() NOT NULL,
              CONSTRAINT fk_customer FOREIGN KEY (customer_id) 
                REFERENCES public.customer (id)
                ON DELETE CASCADE
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.anamnese;
      `);
  }
}
