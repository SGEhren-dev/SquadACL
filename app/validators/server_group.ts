import vine from '@vinejs/vine'

export const serverGroupValidator = vine.compile(
  vine.object({
    slug: vine.string().minLength(3).maxLength(32),
    permissions: vine.string(),
  })
)
