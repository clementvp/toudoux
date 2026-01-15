import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Todo from '#models/todo'
import { DateTime } from 'luxon'

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

    const tasksForClement = Array.from({ length: 50 }).map((_, index) => {
      const randomDayOffset = Math.floor(Math.random() * 30) - 15
      const dueDate = DateTime.now().plus({ days: randomDayOffset }).startOf('day')

      const hasHour = Math.random() > 0.3
      const randomHour = Math.floor(Math.random() * 11) + 8 // Entre 8h et 19h
      const randomMin = Math.random() > 0.5 ? '00' : '30'

      return {
        title: `Tâche n°${index + 1}`,
        description: `Description pour la tâche du ${dueDate.toFormat('dd/MM')}`,
        isCompleted: Math.random() > 0.7,
        dueAt: dueDate,
        hour: hasHour ? `${randomHour.toString().padStart(2, '0')}:${randomMin}` : null,
      }
    })

    await user1.related('todos').createMany(tasksForClement)

    await User.create({
      fullName: 'Marie Martin',
      email: 'marie@test.com',
      password: 'password123',
    })
  }
}
