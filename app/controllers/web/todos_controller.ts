import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
  /**
   * GET /web/todos
   * Affiche la liste complète des tâches
   */
  async index({ auth, inertia }: HttpContext) {
    const user = auth.getUserOrFail()
    const todos = await user.related('todos').query().orderBy('created_at', 'desc')

    return inertia.render('todos/index', { todos })
  }

  /**
   * GET /web/todos/:id
   * Affiche le détail d'une tâche précise
   */
  async show({ auth, params, inertia }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()

    return inertia.render('todos/show', { todo })
  }

  /**
   * POST /web/todos
   * Traitement de la création
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only(['title', 'description'])

    await user.related('todos').create({
      ...data,
      isCompleted: false,
    })

    // On redirige vers l'index pour voir la nouvelle tâche
    return response.redirect().toRoute('todos.index')
  }

  /**
   * PUT/PATCH /web/todos/:id
   * Traitement de la modification (ex: cocher la case "terminé")
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()

    const data = request.only(['title', 'description', 'isCompleted'])
    todo.merge(data)
    await todo.save()

    return response.redirect().back()
  }

  /**
   * DELETE /web/todos/:id
   * Suppression
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('userId', user.id).firstOrFail()

    await todo.delete()

    return response.redirect().toRoute('todos.index')
  }
}
