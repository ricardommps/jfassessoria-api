import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAnamnese1692021858462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.anamnese (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        estado_civil VARCHAR(15),
        endereco_completo TEXT,
        massa_corporal DECIMAL,
        altura DECIMAL,
        percentual_gordura DECIMAL,
        diabetes_ou_pressao BOOLEAN,
        detalhes_doencas TEXT,
        dores_ou_lesoes BOOLEAN,
        detalhes_dores_ou_lesoes TEXT,
        cardiopatia_familiar BOOLEAN,
        detalhes_cardiopatia TEXT,
        outras_doencas BOOLEAN,
        detalhes_outras_doencas TEXT,
        gravida BOOLEAN,
        medicamentos_suplementos TEXT,
        consumo_alcool VARCHAR(50),
        tabagismo VARCHAR(50),
        tipo_dieta VARCHAR(100),
        vegetariano BOOLEAN,
        vegano BOOLEAN,
        pratica_atividade BOOLEAN,
        detalhes_atividade TEXT,
        busca_assessoria_corrida BOOLEAN,
        experiencia_corrida VARCHAR(100),
        maior_distancia_corrida DECIMAL,
        melhor_marca_corrida TEXT,
        treino_fortalecimento VARCHAR(50),
        experiencia_competicao_corrida TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        CONSTRAINT fk_user
          FOREIGN KEY(user_id) 
          REFERENCES public.user(id)
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

export class CreateTableAnamnesis1692021858462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.anamnesis (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        marital_status VARCHAR(15),
        full_address TEXT,
        body_mass DECIMAL,
        height DECIMAL,
        fat_percentage DECIMAL,
        has_diabetes_or_hypertension BOOLEAN,
        disease_details TEXT,
        has_pain_or_injury BOOLEAN,
        pain_or_injury_details TEXT,
        has_family_cardiopathy BOOLEAN,
        cardiopathy_details TEXT,
        has_other_diseases BOOLEAN,
        other_diseases_details TEXT,
        is_pregnant BOOLEAN,
        medications_or_supplements TEXT,
        alcohol_consumption VARCHAR(50),
        smoking_status VARCHAR(50),
        diet_type VARCHAR(100),
        is_vegetarian BOOLEAN,
        is_vegan BOOLEAN,
        practices_physical_activity BOOLEAN,
        physical_activity_details TEXT,
        seeks_running_coaching BOOLEAN,
        running_experience VARCHAR(100),
        longest_running_distance DECIMAL,
        best_running_time TEXT,
        strength_training_experience VARCHAR(50),
        running_competition_experience TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        CONSTRAINT fk_user
          FOREIGN KEY(user_id) 
          REFERENCES public.user(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.anamnesis;
    `);
  }
}

export class CreateTableAnamnesis16920218584624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.anamnesis (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        marital_status INTEGER, -- Ex: 1 = solteiro, 2 = casado, 3 = divorciado
        full_address TEXT,
        body_mass DECIMAL,
        height DECIMAL,
        fat_percentage DECIMAL,
        has_diabetes_or_hypertension INTEGER, -- Ex: 1 = Sim, 2 = Não
        disease_details TEXT,
        has_pain_or_injury INTEGER, -- Ex: 1 = Sim, 2 = Não
        pain_or_injury_details TEXT,
        has_family_cardiopathy INTEGER, -- Ex: 1 = Sim, 2 = Não
        cardiopathy_details TEXT,
        has_other_diseases INTEGER, -- Ex: 1 = Sim, 2 = Não
        other_diseases_details TEXT,
        is_pregnant INTEGER, -- Ex: 1 = Sim, 2 = Não
        medications_or_supplements TEXT,
        alcohol_consumption INTEGER, -- Ex: 1 = Não bebo, 2 = Bebo esporadicamente, 3 = Bebo frequentemente
        smoking_status INTEGER, -- Ex: 1 = Não fumo, 2 = Sou fumante, 3 = Nunca fumei
        diet_type INTEGER, -- Ex: 1 = Ganho de peso, 2 = Perda de peso, 3 = Manutenção
        is_vegetarian INTEGER, -- Ex: 1 = Sim, 2 = Não
        is_vegan INTEGER, -- Ex: 1 = Sim, 2 = Não
        practices_physical_activity INTEGER, -- Ex: 1 = Sim, 2 = Não
        physical_activity_details TEXT,
        seeks_running_coaching INTEGER, -- Ex: 1 = Sim, 2 = Não
        running_experience INTEGER, -- Ex: 1 = Corro semanalmente com assessoria, 2 = Corro sem assessoria, etc.
        longest_running_distance DECIMAL,
        best_running_time TEXT,
        strength_training_experience INTEGER, -- Ex: 1 = Não faço, 2 = Faço específico para corrida, etc.
        running_competition_experience INTEGER, -- Ex: 1 = Já corri em prova e ganhei colocação geral, etc.
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        CONSTRAINT fk_user
          FOREIGN KEY(user_id) 
          REFERENCES public.user(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.anamnesis;
    `);
  }
}
