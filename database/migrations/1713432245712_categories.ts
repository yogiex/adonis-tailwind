import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('bookId').unsigned().references('books.id')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          name: 'comic'
        },
        {
          name: 'fiction'
        },
        {
          name: 'horror'
        },
        {
          name: 'IT'
        },
        {
          name: 'drama'
        },
        {
          name: 'japan'
        },
        {
          name: 'romance'
        },
        {
          name: 'western'
        },
        {
          name: 'thriller'
        },
        {
          name: 'travel'
        },
      ])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
