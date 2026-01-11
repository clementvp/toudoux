import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // L'ID du token reste un entier auto-incrémenté, c'est parfait

      // On retire .unsigned() car c'est un UUID
      table.uuid('tokenable_id').references('id').inTable('users').onDelete('CASCADE').notNullable() // Optionnel mais conseillé : un token doit appartenir à quelqu'un

      table.string('type').notNullable()
      table.string('name').nullable()
      table.string('hash').notNullable()

      // Utilisation de useTz: true pour la cohérence avec le reste du projet
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('last_used_at', { useTz: true }).nullable()
      table.timestamp('expires_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
