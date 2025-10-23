/*
|-------------------------------------------------------------------------- 
| Routes file 
|-------------------------------------------------------------------------- 
| The routes file is used for defining the HTTP routes. 
| 
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const AdminAuthController = () => import('#controllers/admin_auth_controller')

// =========================================================
// 1. PUBLIC ROUTES (Halaman Statis)
// =========================================================
router.on('/').render('pages/home').as('home')
router.get('/about', async ({ view }) => view.render('pages/about')).as('about')
router.get('/contact', async ({ view }) => view.render('pages/contact')).as('contact')
router.get('/shop', async ({ view }) => view.render('pages/shop')).as('shop')
router.get('/cart', async ({ view }) => view.render('pages/cart')).as('cart')
router.get('/wishlist', async ({ view }) => view.render('pages/wishlist')).as('wishlist')

// =========================================================
// 2. AUTHENTICATION ROUTES
// =========================================================
router
  .group(() => {
    // GET /login -> Menampilkan form
    router.get('/login', [AuthController, 'showLogin']).as('login')
    // POST /login -> Memproses login
    router.post('/login', [AuthController, 'login']).as('login.post')

    // GET /signup -> Menampilkan form
    router.get('/signup', [AuthController, 'showSignup']).as('signup')
    // POST /register -> Memproses registrasi
    router.post('/signup', [AuthController, 'signup']).as('signup.post')

    // GET /logout
    router.get('/logout', [AuthController, 'logout']).as('logout')
  })
  .as('auth')

// =========================================================
// 3A. ADMIN LOGIN/LOGOUT ROUTES (Publik)
// =========================================================
router
  .group(() => {
    // GET /admin/login
    router.get('/login', [AdminAuthController, 'showLogin']).as('login')
    // POST /admin/login
    router.post('/login', [AdminAuthController, 'login']).as('login.post')
    // GET /admin/logout
    router.get('/logout', [AdminAuthController, 'logout']).as('logout')
  })
  .prefix('/admin')
  .as('admin')

// =========================================================
// 3B. ADMIN ROUTES (Membutuhkan 'auth' dan 'admin' middleware)
// =========================================================

router
  .group(() => {
    router.get('/dashboard', [AdminAuthController, 'dashboard']).as('dashboard')
  })
  .prefix('/admin')
  .as('admin') // Rute ini bernama admin.dashboard
  .use([middleware.auth(), middleware.admin()])
