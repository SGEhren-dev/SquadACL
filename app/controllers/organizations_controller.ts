import Organization from '#models/organization'
import User from '#models/user'
import OrganizationResource from '#resource/organization_resource'
import { organizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  /**
   * Display a list of resource
   */
  async index() {
    const allOrganizations = await Organization.all()

    return allOrganizations.map((org) => new OrganizationResource(org).make())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { owner, ...restProps } = await organizationValidator.validate(request.all())
    const owningUser = await User.findOrFail(owner)
    const newOrganization = await Organization.create(restProps)

    await owningUser.related('organizations').save(newOrganization)

    return new OrganizationResource(newOrganization).make()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const { id } = params
    const foundOrganization = await Organization.findOrFail(id)

    return new OrganizationResource(foundOrganization).make()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { owner, ...restProps } = await organizationValidator.validate(request.all())
    const foundOrganization = await Organization.query()
      .preload('user')
      .where('id', params['id'])
      .firstOrFail()

    foundOrganization.merge(restProps)

    if (foundOrganization.user.id !== owner) {
      const newUser = await User.findOrFail(owner)

      await newUser.related('organizations').save(foundOrganization)
    }

    return new OrganizationResource(foundOrganization).make()
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const foundOrganization = await Organization.findOrFail(params['id'])

    await foundOrganization.delete()

    return response.noContent()
  }
}
