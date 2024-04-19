import { Application } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import Category from 'App/Models/Category'
export default class DashboardController {
    async index({view}: HttpContextContract){
        const html = await view.render('dashboard/index')
        return html
    }

    async usersView({view}:HttpContextContract){
        const user = await Database.from('users').select('*')
        const html = await view.render('dashboard/users',{
            users: user
        })
        return html
    }

    async booksView({request,view}: HttpContextContract){
        const limit = 8
        const page = request.input('page',)
        // const datas = await Database.from('books').select('*').paginate(page, limit)
        const html = await view.render('dashboard/books', {
            // books: datas
        })
        return html
    }

    async addBookView({view}: HttpContextContract){
        const categories = await Database.from('categories').select('*')
        const html = await view.render('dashboard/addBook', {
            categories : categories
        })
        return html
    }
    async addBook({request,response}: HttpContextContract){
        const {category, author, publisher, title } = request.body()
        const coverImage = request.file('cover_image')
        await coverImage?.move('./public')
        const file = coverImage?.filePath
        const cid = Category.find(category)
        const datas = await Book.create({
            title: title,
            author: author,
            publisher: publisher,
            categoryId: category
        })
        
        console.log(datas)
        return response.redirect().back()
    }

    async categoryView({request,view, params}: HttpContextContract){
        const limit = 5
        const page = request.input('page',1)
        const datas = await Database.from('categories').select('*').paginate(page,limit)
        datas.baseUrl('/dashboard/category')
        const html = await view.render('dashboard/category',{
            categories : datas
        })
        return html
    }
}
