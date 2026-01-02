import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDeviceInfo1760987036350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela device_info
    await queryRunner.createTable(
      new Table({
        name: 'device_info',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'customer_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'info',
            type: 'jsonb',
            isNullable: false,
            default: `'{"brand": "", "model": "", "uniqueId": "", "systemVersion": ""}'`,
          },
          {
            name: 'last_sync_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Criação da foreign key para customer
    await queryRunner.createForeignKey(
      'device_info',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
      }),
    );

    // Índice único para info->>'uniqueId'
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_device_info_unique_id" ON "device_info" ((info->>'uniqueId'));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove índice único
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_device_info_unique_id";`);

    // Remove foreign key
    const table = await queryRunner.getTable('device_info');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('customer_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('device_info', foreignKey);
      }
    }

    // Remove tabela
    await queryRunner.dropTable('device_info');
  }
}
