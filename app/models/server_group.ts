import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Server from '#models/server'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ServerGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare permissions: string

  @column()
  declare serverId: number

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
