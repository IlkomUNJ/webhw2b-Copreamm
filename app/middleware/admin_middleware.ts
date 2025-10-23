import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.auth.user) {
      return ctx.response.redirect().toRoute('auth.login')
    }

    // Check if user has admin role
    if (ctx.auth.user?.role !== 'admin') {
      return ctx.response.redirect().toRoute('admin.login')
    }

    return next()
  }
}
