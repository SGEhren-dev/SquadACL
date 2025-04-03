import ServerGroup from '#models/server_group'
import BaseResource from './base_resource.js'

export default class ServerGroupResource extends BaseResource<ServerGroup> {
  public make(): object | object[] {
    return {
      id: this.resource.id,
      slug: this.resource.slug,
      permissions: this.resource.permissions,
    }
  }
}
