import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableStravaConnection1772026414525
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cria a tabela strava_connection
    await queryRunner.createTable(
      new Table({
        name: 'strava_connection',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'strava_athlete_id',
            type: 'bigint',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'access_token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'refresh_token',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'expires_at',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Cria a FK para customer_id
    await queryRunner.createForeignKey(
      'strava_connection',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedTableName: 'customer',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove FK primeiro
    const table = await queryRunner.getTable('strava_connection');
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('customer_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('strava_connection', foreignKey);
    }

    // Remove tabela
    await queryRunner.dropTable('strava_connection');
  }
}
