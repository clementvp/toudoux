import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'

import User from '#models/user'
import { randomUUID } from 'node:crypto'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare isCompleted: boolean

  @column()
  declare userId: string

  @column.dateTime()
  declare dueAt: DateTime | null

  @beforeCreate()
  public static assignUuid(todo: Todo) {
    todo.id = randomUUID()
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
