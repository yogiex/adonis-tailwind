/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/login','AuthController.loginView')
Route.get('/register','AuthController.registerView')
Route.post('/login','AuthController.login').as('auth.login')
Route.post('/register','AuthController.register').as('auth.register')
Route.get('/logout','AuthController.logout').as('auth.logout')

Route.get('/dashboard/home','DashboardController.index')
Route.get('/dashboard/users','DashboardController.usersView')
Route.get('/dashboard/books','DashboardController.booksView')
Route.post('/dashboard/addbok','DashboardController.addBook').as('book.insert')
Route.get('/dashboard/addbook','DashboardController.addBookView')
Route.get('/dashboard/category/:page?','DashboardController.categoryView')

