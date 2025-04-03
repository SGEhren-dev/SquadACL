import Organization from '#models/organization'
import BaseResource from '#resource/base_resource'

export default class OrganizationResource extends BaseResource<Organization> {
  public make(): object | object[] {
    return {
      id: this.resource.id,
      name: this.resource.name,
    }
  }
}
