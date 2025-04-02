import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'admin@squadacl.com',
      password: 'Password123$!',
    })
  }
}
