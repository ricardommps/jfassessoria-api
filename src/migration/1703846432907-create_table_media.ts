import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMedia1703846432907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.media(
            id integer NOT NULL,
            user_id int NOT NULL,
            title character varying NOT NULL,
            thumbnail character varying NOT NULL,
            video_url character varying NOT NULL,
            instrucctions character varying NOT NULL,
            blocked boolean NOT NULL DEFAULT FALSE,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL,
            primary key (id),
            foreign key (user_id) references public.user(id)
        );
        
        CREATE SEQUENCE public.media_id_seq
            AS integer
            START WITH 1
            INCREMENT BY 1
            NO MINVALUE
            NO MAXVALUE
            CACHE 1;
                        
        ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;
                    
        ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        drop table public.media;
    `);
  }
}
