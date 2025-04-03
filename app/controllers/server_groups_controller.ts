import Server from '#models/server'
import ServerGroup from '#models/server_group'
import ServerGroupResource from '#resource/server_group_resource'
import { serverGroupValidator } from '#validators/server_group'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServerGroupsController {
  /**
   * Display a list of resource
   */
  async index({ response, params }: HttpContext) {
    const { serverId } = params
    const foundServer = await Server.query()
      .preload('serverGroups')
      .where('id', serverId)
      .firstOrFail()

    return response.ok(
      foundServer.serverGroups.map((serverGroup) => new ServerGroupResource(serverGroup).make())
    )
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, params }: HttpContext) {
    const payload = await serverGroupValidator.validate(request.all())
    const { serverId } = params
    const foundServer = await Server.findOrFail(serverId)
    const newServerGroup = await foundServer.related('serverGroups').create(payload)

    return new ServerGroupResource(newServerGroup).make()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { serverId, id } = params
    const foundServerGroup = await ServerGroup.findByOrFail({ id, server_id: serverId })

    return new ServerGroupResource(foundServerGroup).make()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await serverGroupValidator.validate(request.all())
    const { id, serverId } = params
    const foundServerGroup = await ServerGroup.findByOrFail({ id, server_id: serverId })

    await foundServerGroup.merge(payload).save()

    return new ServerGroupResource(foundServerGroup).make()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id, serverId } = params
    const foundServerGroup = await ServerGroup.findByOrFail({ id, server_id: serverId })

    await foundServerGroup.delete()

    return response.noContent()
  }
}
