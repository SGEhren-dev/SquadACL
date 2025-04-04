import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Whitelist from '#models/whitelist'

export default class Organization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare userId: number

  @column()
  declare maxSlots: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Whitelist)
  declare whitelist: HasMany<typeof Whitelist>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public getOwnerId() {
    return this.userId
  }
}
