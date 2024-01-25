'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'BlogController.home');

// This Route for User Signup
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

// This Route for User Login
Route.on('/login').render('auth/login')
Route.post('/login', 'UserController.login').validator('LoginUser')

// This Route for user are logout the application..
Route.get('/logout', async({ auth, response }) => {
    await auth.logout();
    return response.redirect('/'); 
})

//This route show the all blogs
Route.get('/post-a-blog', 'BlogController.userIndex');  

////This route for create the your Blog when you login
Route.post('/post-a-blog', 'BlogController.create').validator('CreateBlog');

//This route for delte the blog
Route.get('/post-a-blog/delete/:id', 'BlogController.delete');

//This route for goto the edit page and update the previous value..
Route.get('/post-a-blog/edit/:id', 'BlogController.edit');
Route.post('/post-a-blog/update/:id', 'BlogController.update').validator('CreateBlog');




  
