import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Todo from '#models/todo'

export default class extends BaseSeeder {
  async run() {
    // 1. Nettoyage
    await Todo.query().delete()
    await User.query().delete()

    // 2. Création de Clément
    const user1 = await User.create({
      fullName: 'Clement Durand',
      email: 'clement@test.com',
      password: 'password123',
    })

    // 3. Génération de 50 tâches pour Clément
    const tasksForClement = Array.from({ length: 50 }).map((_, index) => ({
      title: `Tâche n°${index + 1} pour Clément`,
      description: `Description détaillée pour la tâche automatique numéro ${index + 1}`,
      isCompleted: Math.random() > 0.5, // Aléatoirement complété ou non
    }))

    await user1.related('todos').createMany(tasksForClement)

    // 4. Création de Marie (reste identique)
    const user2 = await User.create({
      fullName: 'Marie Martin',
      email: 'marie@test.com',
      password: 'password123',
    })

    await user2
      .related('todos')
      .createMany([{ title: 'Faire les courses', description: 'Pain, lait', isCompleted: false }])
  }
}
