import { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async updateTodo({ auth, response, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await user.related('todos').query().where('id', params.id).first()
    if (!todo) {
      return response.redirect().back()
    }
    todo.isCompleted = !todo.isCompleted
    await todo.save()
    return response.redirect().back()
  }

  async deleteTodo({ auth, response, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await user.related('todos').query().where('id', params.id).first()
    if (!todo) {
      return response.redirect().back()
    }

    await todo.delete()
    return response.redirect().back()
  }

  async createTodo({ auth, response, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { title, dueAt, description, hour } = request.only([
      'title',
      'dueAt',
      'description',
      'hour',
    ])
    await user.related('todos').create({ title, dueAt, description, hour })
    return response.redirect().back()
  }
}
