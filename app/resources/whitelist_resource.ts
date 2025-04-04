import Whitelist from '#models/whitelist'
import BaseResource from '#resource/base_resource'

export default class WhitelistResource extends BaseResource<Whitelist> {
  public make(): object | object[] {
    return {
      id: this.resource.id,
      steamId: this.resource.steamId,
      username: this.resource.username,
      expires: this.resource.expires,
      enabled: this.resource.enabled,
    }
  }
}
