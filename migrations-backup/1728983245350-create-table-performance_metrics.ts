import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePerformanceMetrics1728983245350
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.performance_metrics (
              id integer NOT NULL,
              pv character varying,
              pace_pv character varying,
              vla_level character varying,
              vlan_level character varying,
              fcm character varying,
              vla character varying,
              pace_vla character varying,
              vlan character varying,
              pace_vlan character varying,
              test character varying,
              date_test character varying,
              created_at timestamp without time zone DEFAULT now() NOT NULL,
              updated_at timestamp without time zone DEFAULT now() NOT NULL,
              customer_id integer NOT NULL,
              primary key (id),
                foreign key (customer_id) 
                  references public.customer (id)
                  ON DELETE CASCADE
            );
             CREATE SEQUENCE public.performance_metrics_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.performance_metrics_id_seq OWNED BY public.performance_metrics.id;
            
            ALTER TABLE ONLY public.performance_metrics ALTER COLUMN id SET DEFAULT nextval('public.performance_metrics_id_seq'::regclass);
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.performance_metrics;
    `);
  }
}
