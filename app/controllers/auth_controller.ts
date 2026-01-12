import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * LOGIN WEB : Correction pour la gestion des erreurs Inertia
   */
  async loginWeb({ request, auth, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect().toRoute('todos.index')
    } catch (error) {
      // IMPORTANT : Pour Inertia, on flash l'erreur en session
      // pour qu'elle apparaisse dans le hook useForm()
      session.flash('errors', {
        email: 'Identifiants invalides. Veuillez réessayer.',
      })
      return response.redirect().back()
    }
  }

  /**
   * LOGIN API : Reste inchangé (parfait pour Bun)
   */
  async loginApi({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return response.ok({
        type: 'bearer',
        token: token.value!.release(),
        expires_at: token.expiresAt,
      })
    } catch (error) {
      return response.unauthorized({ error: 'Identifiants invalides' })
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
