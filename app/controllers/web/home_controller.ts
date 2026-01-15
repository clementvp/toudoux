import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async showHome({ inertia }: HttpContext) {
    return inertia.render('home/index')
  }
}
