import vine from '@vinejs/vine'

export const whitelistValidator = vine.compile(
  vine.object({
    steamId: vine.string().fixedLength(17),
    enabled: vine.boolean(),
  })
)
