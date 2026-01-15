/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const HomeController = () => import('#controllers/web/home_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .get('/', [HomeController, 'showHome'])
  .as('home')
  .use(middleware.auth({ guards: ['web'] }))

router
  .group(() => {
    router.get('login', [AuthController, 'showLogin'])
    router.post('login', [AuthController, 'loginWeb'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['web'] }))
  })
  .prefix('/web')
