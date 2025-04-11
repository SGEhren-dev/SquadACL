import Organization from '#models/organization'
import type { HttpContext } from '@adonisjs/core/http'

const wlPermissionString = 'Group=Whitelist:reserve'

export default class RemoteAdminsController {
  async index({ params, response }: HttpContext) {
    const { id } = params
    const foundOrganization = await Organization.query()
      .preload('whitelist')
      .where('id', id)
      .firstOrFail()

    const wlDataString = await foundOrganization.whitelist
      .map((whitelist) => `Admin=${whitelist.steamId}:Whitelist`)
      .join('\r\n')

    return response
      .header('content-type', 'text/plain')
      .ok(`${wlPermissionString}\r\n${wlDataString}`)
  }
}
