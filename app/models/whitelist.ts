import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import Organization from '#models/organization'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Whitelist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare steamId: string

  @column()
  declare username: string

  @column()
  declare enabled: boolean

  @column()
  declare organizationId: number

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column.dateTime()
  declare expires: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Scopes
  static scopeEnabled = scope((query) => {
    query.where('enabled', true)
  })
}
