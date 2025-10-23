import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  // Show register page
  async showSignup({ view }: HttpContext) {
    return view.render('auth/signup')
  }

  // Show login page
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  // Handle registration
  async signup({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    // Menambahkan role 'user' pada saat pendaftaran
    await User.create({
      ...data,
      role: 'user', // Default role sebagai 'user'
    })

    session.flash('success', 'Registration successful! Please login.')
    return response.redirect().toRoute('auth.login')
  }

  // Handle login
  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // Cek role pengguna
    if (user.role === 'admin') {
      await auth.use('web').login(user)
      session.flash('success', 'Welcome Admin!')
      return response.redirect().toRoute('admin.dashboard') // Redirect ke dashboard admin
    } else if (user.role === 'user') {
      await auth.use('web').login(user)
      session.flash('success', 'Welcome Buyer!')
      return response.redirect().toRoute('user.home') // Redirect ke halaman utama untuk buyer
    }

    session.flash('error', 'Invalid credentials')
    return response.redirect().back()
  }

  // Handle logout
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Logged out successfully')
    return response.redirect().toRoute('auth.login')
  }
}
