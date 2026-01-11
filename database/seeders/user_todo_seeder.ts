import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Todo from '#models/todo'

export default class extends BaseSeeder {
  async run() {
    // 1. Nettoyage de la base de données
    // On commence par les Todos car ils dépendent des Users
    await Todo.query().delete()
    await User.query().delete()

    // 2. Création du premier utilisateur avec ses tâches
    const user1 = await User.create({
      fullName: 'Clement Durand',
      email: 'clement@test.com',
      password: 'password123',
    })

    await user1.related('todos').createMany([
      {
        title: 'Apprendre AdonisJS 6',
        description: 'Maîtriser les Lucid Models et les Migrations',
        isCompleted: true,
      },
      {
        title: 'Déployer sur CapRover',
        description: "Préparer le Dockerfile et l'instance",
        isCompleted: false,
      },
    ])

    // 3. Création du deuxième utilisateur avec ses tâches
    const user2 = await User.create({
      fullName: 'Marie Martin',
      email: 'marie@test.com',
      password: 'password123',
    })

    await user2.related('todos').createMany([
      {
        title: 'Faire les courses',
        description: 'Pain, lait, et café',
        isCompleted: false,
      },
      {
        title: 'Sport',
        description: 'Séance de 45 minutes',
        isCompleted: true,
      },
    ])
  }
}
