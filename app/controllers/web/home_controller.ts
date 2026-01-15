import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class HomeController {
  async showHome({ auth, inertia, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const month = request.input('month', DateTime.now().month)
    const year = request.input('year', DateTime.now().year)

    const targetDate = DateTime.fromObject({
      month: Number(month),
      year: Number(year),
    })

    const startRange = targetDate.minus({ months: 1 }).startOf('month')
    const endRange = targetDate.plus({ months: 1 }).endOf('month')

    const todos = await user
      .related('todos')
      .query()
      .where('dueAt', '>=', startRange.toSQLDate()!)
      .where('dueAt', '<=', endRange.toSQLDate()!)
      .orderBy('dueAt', 'asc')
      .orderBy('hour', 'asc')

    const mappedTodos = todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
      dueAt: todo.dueAt?.toISODate(),
      hour: todo.hour,
    }))

    return inertia.render('home/index', {
      todos: mappedTodos,
      currentMonth: targetDate.month,
      currentYear: targetDate.year,
    })
  }
}
