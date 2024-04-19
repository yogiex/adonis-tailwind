import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    async loginView({view}: HttpContextContract){
        const html = await view.render('login', {
            title: 'Login Page'
        })
        return html
    }

    async registerView({view}: HttpContextContract){
        const html = await view.render('register', {
            title: 'Register page'
        })
        return html
    }

    async login({request,auth, session,response}: HttpContextContract){
        const {username, password} = request.only(['username','password'])
        try {
            await auth.attempt(username,password)

        } catch (error) {
            session.flash('errors','Invalid Username or Password')
            return response.redirect().back()
        }
        return response.redirect('/dashboard/home')
    }
    async register({request, auth, response}: HttpContextContract){
        const userRegister = schema.create({
            username: schema.string(),
            password: schema.string(),
            email: schema.string({}, [rules.email(),rules.trim()]),
            phone: schema.string(),
            address: schema.string(),
            fullname: schema.string()
        })
        const datas = await request.validate({schema: userRegister})
        const user = await User.create(datas)
        await auth.login(user)
        return response.redirect('/login')
    }
    async logout({response, auth}: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
