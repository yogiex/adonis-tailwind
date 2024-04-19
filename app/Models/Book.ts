import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public title: string;

  @column()
  public status: string;

  @column()
  public author: string;

  @column()
  public publisher: string;

  @column()
  public cover_image: string;

  @column()
  public categoryId: number;

  // @manyToMany(() => Category)
  // public categoryId: ManyToMany<typeof Category>; 

  @hasMany(() => Category)
  public category: HasMany<typeof Category>
}
