import type { HttpContext } from '@adonisjs/core/http'
import Server from '#models/server'
import ServerResource from '#resource/server_resource'
import { createServerValidator, updateServerValidator } from '#validators/server'

export default class ServersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const servers = await Server.all()

    return response.ok(servers.map((server) => new ServerResource(server).make()))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await createServerValidator.validate(request.all())
    const { name } = payload
    const newServer = await Server.create({ name: name })

    return new ServerResource(newServer).make()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params['id']
    const foundServer = await Server.findOrFail(id)

    return new ServerResource(foundServer).make()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await updateServerValidator.validate(request.all())
    const id = params['id']
    const foundServer = await Server.findOrFail(id)

    await foundServer.merge(payload)
    await foundServer.save()

    return new ServerResource(foundServer).make()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const id = params['id']
    const foundServer = await Server.findOrFail(id)

    await foundServer.delete()

    return response.noContent()
  }
}
