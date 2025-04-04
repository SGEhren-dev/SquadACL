import vine from '@vinejs/vine'

export const organizationValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(32),
    owner: vine.number().min(0),
    maxSlots: vine.number().min(0).max(100),
  })
)
