import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
  /**
   * GET /api/todos
   */
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return await user.related('todos').query().orderBy('created_at', 'desc')
  }

  /**
   * GET /api/todos/:id
   */
  async show({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()
    return await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()
  }

  /**
   * POST /api/todos
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only(['title', 'description'])

    if (!data.title) {
      return response.badRequest({ error: 'Le titre est requis' })
    }

    const todo = await user.related('todos').create({
      title: data.title,
      description: data.description,
      isCompleted: false,
    })

    return response.created(todo)
  }

  /**
   * PUT/PATCH /api/todos/:id
   */
  async update({ auth, params, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const todo = await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()

    const data = request.only(['title', 'description', 'isCompleted'])

    todo.merge(data)
    await todo.save()

    return todo
  }

  /**
   * DELETE /api/todos/:id
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const todo = await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()

    await todo.delete()

    return response.noContent()
  }
}
