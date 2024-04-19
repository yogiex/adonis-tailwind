import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('fullname')
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('avatar').nullable()
      table.string('phone').nullable()
      table.string('zip_code').nullable()
      table.string('address').nullable()
      table.integer('role_id').unsigned().references('roles.id').defaultTo(Roles.USER)
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
