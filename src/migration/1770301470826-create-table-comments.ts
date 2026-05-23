import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableComments1770301470826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar a tabela comments
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'rowid',
          },
          {
            name: 'finished_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'author_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'parent_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'is_admin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
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

    // Foreign key finished
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['finished_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'finished',
        onDelete: 'CASCADE',
      }),
    );

    // Foreign key author
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
      }),
    );

    // Foreign key parent (self-reference)
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comments',
        onDelete: 'CASCADE',
      }),
    );

    // Índices
    await queryRunner.query(
      `CREATE INDEX "IDX_comments_finished_id" ON "comments" ("finished_id")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_author_id" ON "comments" ("author_id")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_parent_id" ON "comments" ("parent_id")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_read" ON "comments" ("read")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_comments_read_is_admin" ON "comments" ("read", "is_admin")`,
    );

    /**
     * ============================
     * MIGRAÇÃO DE COMMENTS (ALUNO)
     * ============================
     */

    // workout (id integer)
    await queryRunner.query(`
          INSERT INTO comments (finished_id, author_id, parent_id, content, is_admin, created_at, updated_at, read)
          SELECT 
            f.id,
            p.customer_id,
            NULL,
            f.comments,
            false,
            CAST(f.execution_day AS timestamp),
            CAST(f.execution_day AS timestamp),
            CASE 
              WHEN f.feedback IS NOT NULL AND f.feedback <> '' THEN true
              ELSE false
            END
          FROM finished f
          INNER JOIN workout w ON f.workout_id = w.id
          INNER JOIN program p ON w.program_id = p.id
          WHERE f.comments IS NOT NULL AND f.comments <> '';
        `);

    // workouts (id uuid)
    await queryRunner.query(`
          INSERT INTO comments (finished_id, author_id, parent_id, content, is_admin, created_at, updated_at, read)
          SELECT 
            f.id,
            p.customer_id,
            NULL,
            f.comments,
            false,
            CAST(f.execution_day AS timestamp),
            CAST(f.execution_day AS timestamp),
            CASE 
              WHEN f.feedback IS NOT NULL AND f.feedback <> '' THEN true
              ELSE false
            END
          FROM finished f
          INNER JOIN workouts w ON f.workouts_id = w.id
          INNER JOIN program p ON w.program_id = p.id
          WHERE f.comments IS NOT NULL AND f.comments <> '';
        `);

    /**
     * ============================
     * MIGRAÇÃO DE FEEDBACK (ADMIN)
     * ============================
     */

    // workout (id integer)
    await queryRunner.query(`
          INSERT INTO comments (finished_id, author_id, parent_id, content, is_admin, created_at, updated_at, read)
          SELECT 
            f.id,
            (SELECT id FROM customer WHERE type_user IN (1, 2) ORDER BY id LIMIT 1),
            NULL,
            f.feedback,
            true,
            CAST(f.execution_day AS timestamp),
            CAST(f.execution_day AS timestamp),
            true
          FROM finished f
          INNER JOIN workout w ON f.workout_id = w.id
          INNER JOIN program p ON w.program_id = p.id
          WHERE f.feedback IS NOT NULL AND f.feedback <> '';
        `);

    // workouts (id uuid)
    await queryRunner.query(`
          INSERT INTO comments (finished_id, author_id, parent_id, content, is_admin, created_at, updated_at, read)
          SELECT 
            f.id,
            (SELECT id FROM customer WHERE type_user IN (1, 2) ORDER BY id LIMIT 1),
            NULL,
            f.feedback,
            true,
            CAST(f.execution_day AS timestamp),
            CAST(f.execution_day AS timestamp),
            true
          FROM finished f
          INNER JOIN workouts w ON f.workouts_id = w.id
          INNER JOIN program p ON w.program_id = p.id
          WHERE f.feedback IS NOT NULL AND f.feedback <> '';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_comments_read_is_admin"`);
    await queryRunner.query(`DROP INDEX "IDX_comments_read"`);
    await queryRunner.query(`DROP INDEX "IDX_comments_parent_id"`);
    await queryRunner.query(`DROP INDEX "IDX_comments_author_id"`);
    await queryRunner.query(`DROP INDEX "IDX_comments_finished_id"`);

    const table = await queryRunner.getTable('comments');

    const foreignKeyFinished = table?.foreignKeys.find((fk) =>
      fk.columnNames.includes('finished_id'),
    );

    const foreignKeyAuthor = table?.foreignKeys.find((fk) =>
      fk.columnNames.includes('author_id'),
    );

    const foreignKeyParent = table?.foreignKeys.find((fk) =>
      fk.columnNames.includes('parent_id'),
    );

    if (foreignKeyFinished) {
      await queryRunner.dropForeignKey('comments', foreignKeyFinished);
    }

    if (foreignKeyAuthor) {
      await queryRunner.dropForeignKey('comments', foreignKeyAuthor);
    }

    if (foreignKeyParent) {
      await queryRunner.dropForeignKey('comments', foreignKeyParent);
    }

    await queryRunner.dropTable('comments');
  }
}
