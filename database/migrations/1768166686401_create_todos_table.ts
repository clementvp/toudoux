import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // 1. Clé primaire UUID (gérée par le hook @beforeCreate dans ton modèle)
      table.uuid('id').primary()

      // 2. Relation avec l'utilisateur (Clé étrangère UUID)
      table
        .uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE') // Supprime les todos si l'utilisateur est supprimé
        .notNullable()

      // 3. Champs de données
      table.string('title').notNullable()
      table.text('description').nullable()
      table.boolean('is_completed').notNullable().defaultTo(false)

      // 4. Timestamps (avec fuseau horaire pour Postgres)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
