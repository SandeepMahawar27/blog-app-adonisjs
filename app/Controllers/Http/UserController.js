'use strict'

const User = use('App/Models/User')

class UserController {
    async create({ request, response, auth, session }) {
      const user = await User.create(request.only(['username', 'email', 'password']))
         
      await auth.login(user)
      return response.redirect('/');  
  }

  async login({ request, response, auth, session }) {
    const {email, password} = request.all();
     try {
      await auth.attempt(email, password);
      return response.redirect('/');
     } catch (error) {
      session.flash({loginError: "These credials do not work."})
      return response.redirect('/login');
     }
  }

  async logout({ auth, response, session }) {
    await auth.logout()

    session.flash({ notification: 'Logout successful!' })
    return response.redirect('/')
  }
}

module.exports = UserController
