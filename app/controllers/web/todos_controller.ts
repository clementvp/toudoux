import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'

export default class TodosController {
  /**
   * GET /web/todos
   * Affiche la liste complète des tâches
   */
  async index({ auth, inertia, request }: HttpContext) {
    const user = auth.getUserOrFail()

    // 1. On récupère le numéro de page depuis la query string (?page=1)
    const page = request.input('page', 1)

    // 2. On utilise .paginate(page, limite)
    const todos = await user
      .related('todos')
      .query()
      .orderBy('created_at', 'desc')
      .paginate(page, 10)

    // 3. On passe l'objet à Inertia
    // Note : .toJSON() est nécessaire ici pour transformer l'instance du Paginator
    // en un objet simple utilisable par ton composant Frontend.
    return inertia.render('todos/index/index', {
      todos: todos.toJSON(),
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('todos/create/create')
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
