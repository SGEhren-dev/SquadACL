import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthenticationController {
  public async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('api').createToken(user)

    return {
      id: user.id,
      email: user.email,
      token,
    }
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('api').invalidateToken()

    return response.noContent()
  }
}
