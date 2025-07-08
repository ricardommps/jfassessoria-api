// scripts/revert-migration.ts
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// Carrega as variáveis de ambiente
config({ path: '.env.development.local' });

const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
  migrations: [`${__dirname}/../migration/*{.ts,.js}`],
  ssl: false,
});

async function revertMigration() {
  try {
    await AppDataSource.initialize();
    // Reverte a última migration
    await AppDataSource.undoLastMigration();
  } catch (error) {
    console.error('Erro ao reverter migration:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

revertMigration();
