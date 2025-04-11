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
const RemoteAdminsController = () => import('#controllers/remote_admins_controller')
const WhitelistsController = () => import('#controllers/whitelists_controller')
const OrganizationsController = () => import('#controllers/organizations_controller')
const ServerGroupsController = () => import('#controllers/server_groups_controller')
const ServersController = () => import('#controllers/servers_controller')
const AuthenticationController = () => import('#controllers/authentication_controller')

router
  .group(function () {
    router.resource('server', ServersController).apiOnly()
    router.resource('organization', OrganizationsController).apiOnly()

    router
      .group(function () {
        router.resource('whitelists', WhitelistsController).apiOnly()
      })
      .prefix('organization/:orgId')

    router
      .group(function () {
        router.resource('group', ServerGroupsController).apiOnly()
      })
      .prefix('server/:serverId')
  })
  .prefix('api')
  .middleware(middleware.auth({ guards: ['api'] }))

router
  .group(function () {
    router
      .get('whitelist', [RemoteAdminsController, 'index'])
      .as('remote-admin')
      .prefix('/organizations/:id')
  })
  .prefix('public')
  .as('public.')

router
  .group(function () {
    router.post('login', [AuthenticationController, 'login']).as('login')
    router.post('logout', [AuthenticationController, 'logout']).as('logout')
  })
  .prefix('api/auth')
  .as('auth')

router.get('*', async ({ view }) => {
  return view.render('welcome')
})
