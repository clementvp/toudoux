import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async loginWeb({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user, !!request.input('remember_me'))
      return response.redirect().toRoute('home')
    } catch (error) {
      session.flashErrors({ auth: 'Identifiants invalides' })
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    if (await auth.use('web').check()) {
      await auth.use('web').logout()
      return response.redirect().toPath('/web/login')
    }

    if (await auth.use('api').check()) {
      const user = auth.use('api').user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.noContent()
    }

    return response.redirect().toPath('/')
  }
}
