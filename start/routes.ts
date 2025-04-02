/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ServersController = () => import('#controllers/servers_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')

router
  .group(function () {
    router.resource('server', ServersController).apiOnly()
  })
  .prefix('api')
  .middleware(middleware.auth({ guards: ['api'] }))

router
  .group(function () {
    router.post('login', [AuthenticationController, 'login']).as('login')
    router.post('logout', [AuthenticationController, 'logout']).as('logout')
  })
  .prefix('api/auth')
  .as('auth')

router.any('*', async ({ view }) => {
  return view.render('welcome')
})
