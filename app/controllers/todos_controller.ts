// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async updateTodo({ auth, response, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const todo = await user.related('todos').query().where('id', params.id).firstOrFail()

    todo.isCompleted = !todo.isCompleted
    await todo.save()

    return response.redirect().back()
  }
}
