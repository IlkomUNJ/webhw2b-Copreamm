import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Check if admin already exists
    const existingAdmin = await User.query().where('email', 'admin@scent-amoura.com').first()

    if (existingAdmin) {
      console.log('Admin account already exists')
      return
    }

    // Create default admin account
    await User.create({
      fullName: 'Admin',
      email: 'admin@scent-amoura.com',
      password: 'admin123', // Will be hashed automatically by the model
      role: 'admin',
    })

    console.log('Default admin account created successfully')
    console.log('  Email: admin@scent-amoura.com')
    console.log('  Password: admin123')
    console.log('  ⚠️  IMPORTANT: Change the password after first login!')
  }
}
