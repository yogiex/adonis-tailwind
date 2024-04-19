import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // @hasMany(() => Book)
  // public books: HasMany<typeof Book>

  @belongsTo(() => Book)
  public books: BelongsTo<typeof Book>

  // @column()
  // public book_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
