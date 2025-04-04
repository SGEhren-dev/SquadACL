import Organization from '#models/organization'
import Whitelist from '#models/whitelist'
import WhitelistResource from '#resource/whitelist_resource'
import { whitelistValidator } from '#validators/whitelist'
import type { HttpContext } from '@adonisjs/core/http'

export default class WhitelistsController {
  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    const { orgId } = params
    const foundOrganization = await Organization.query()
      .preload('whitelist')
      .where('id', orgId)
      .firstOrFail()

    return foundOrganization.whitelist.map((wl) => new WhitelistResource(wl).make())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, params }: HttpContext) {
    console.log(request.all())
    const payload = await whitelistValidator.validate(request.all())
    const { orgId } = params
    const foundOrganization = await Organization.findOrFail(orgId)

    const newWhitelist = await foundOrganization.related('whitelist').create(payload)

    return new WhitelistResource(newWhitelist).make()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { orgId, id } = params
    const foundWhitelist = await Whitelist.findByOrFail({ id, organization_id: orgId })

    return new WhitelistResource(foundWhitelist).make()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await whitelistValidator.validate(request.all())
    const { orgId, id } = params
    const foundWhitelist = await Whitelist.findByOrFail({ id, organization_id: orgId })

    await foundWhitelist.merge(payload).save()

    return new WhitelistResource(foundWhitelist).make()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { orgId, id } = params
    const foundWhitelist = await Whitelist.findByOrFail({ id, organization_id: orgId })

    await foundWhitelist.delete()

    return response.noContent()
  }
}
