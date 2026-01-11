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
const WebTodosController = () => import('#controllers/web/todos_controller')
const ApiTodosController = () => import('#controllers/api/todos_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')

router
  .group(() => {
    router.get('todos', [ApiTodosController, 'index'])
    router.get('todos/:id', [ApiTodosController, 'show'])
    router.post('todos', [ApiTodosController, 'store'])
    router.put('todos/:id', [ApiTodosController, 'update'])
    router.delete('todos/:id', [ApiTodosController, 'destroy'])
  })
  .prefix('/api')
  .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.get('todos', [WebTodosController, 'index']).as('todos.index')
    router.get('todos/:id', [WebTodosController, 'show']).as('todos.show')
    router.post('todos', [WebTodosController, 'store']).as('todos.store')
    router.put('todos/:id', [WebTodosController, 'update']).as('todos.update')
    router.delete('todos/:id', [WebTodosController, 'destroy']).as('todos.destroy')
  })
  .prefix('/web')
  .use(middleware.auth({ guards: ['web'] }))
