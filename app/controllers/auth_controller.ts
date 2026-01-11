import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Affiche la page de connexion (Web)
   */
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * LOGIN pour le WEB (Session)
   * Utilise le guard 'web' pour créer un cookie de session
   */
  async loginWeb({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Vérification des identifiants via le mixin AuthFinder du modèle
      const user = await User.verifyCredentials(email, password)

      // Connexion via session
      await auth.use('web').login(user)

      return response.redirect().toRoute('todos.index')
    } catch (error) {
      return response.badRequest({ error: 'Identifiants invalides' })
    }
  }

  /**
   * LOGIN pour l'API (Token pour Bun)
   * Renvoie un jeton JSON utilisable en Bearer Token
   */
  async loginApi({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Vérification des identifiants
      const user = await User.verifyCredentials(email, password)

      // Création du token opaque via la propriété statique de ton modèle User
      const token = await User.accessTokens.create(user)

      return response.ok({
        type: 'bearer',
        token: token.value!.release(), // La valeur brute du token à envoyer au client
        expires_at: token.expiresAt,
      })
    } catch (error) {
      return response.unauthorized({ error: 'Identifiants invalides' })
    }
  }

  /**
   * LOGOUT
   * Gère la déconnexion selon le guard utilisé
   */
  async logout({ auth, response }: HttpContext) {
    // Cas Web
    if (await auth.use('web').check()) {
      await auth.use('web').logout()
      return response.redirect().toPath('/web/login')
    }

    // Cas API
    if (await auth.use('api').check()) {
      const user = auth.use('api').user!
      // Supprime le token actuel de la base de données
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.noContent()
    }

    return response.redirect().toPath('/')
  }
}
