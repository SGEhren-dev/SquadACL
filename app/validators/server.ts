import vine from '@vinejs/vine'

const baseServerValidator = vine.object({
  name: vine.string().trim().minLength(3),
})

export const createServerValidator = vine.compile(baseServerValidator)
export const updateServerValidator = vine.compile(baseServerValidator)
