import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddRoleToUsers extends BaseSchema {
  protected tableName = 'users'

  async up() {
    // Add the `role` column to the users table
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['user', 'admin']).defaultTo('user').notNullable()
    })
  }

  async down() {
    // Rollback: Remove the `role` column
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
