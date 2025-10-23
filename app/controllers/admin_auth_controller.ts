import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminAuthController {
  // Show admin login page
  async showLogin({ view }: HttpContext) {
    return view.render('pages/admin/login')
  }

  // Handle admin login
  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // Check if user role is 'admin'
    if (user.role !== 'admin') {
      session.flash('error', 'Access denied. Admin only.')
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    session.flash('success', 'Welcome, Admin!')
    return response.redirect().toRoute('admin.dashboard')
  }

  // Handle admin logout
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Logged out successfully')
    return response.redirect().toRoute('admin.login')
  }

  async dashboard({ view }: HttpContext) {
    return view.render('admin/dashboard')
  }
}
