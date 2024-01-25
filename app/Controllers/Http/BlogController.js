'use strict';

const Blog = use('App/Models/Blog'); 

class BlogController {
  async home({ view }) {
    try {
      const blogs = await Blog.all();
      return view.render('index', { blogs: blogs.toJSON() });
    } catch (error) {
      // Handle the error appropriately, e.g., render an error view
      console.error('Error fetching blogs:', error);
    }
  }

  async userIndex({ view, auth }) {
    try {
      const user = auth.user;
      // Ensure the user is authenticated before fetching blogs
      if (!user) {
        throw new Error('User not authenticated');
      }

      const blogs = await user.blogs().fetch();
      return view.render('blogs', { blogs: blogs.toJSON() });
    } catch (error) {
       // Handle the error appropriately, e.g., render an error view
      console.error('Error fetching user blogs:', error);
    }
  }

  // This function handle the createion of blog first check the user are login
  async create({ request, response, auth, session }) {
      const blog = request.all();

      const posted = await auth.user.blogs().create({
        title: blog.title,
        description: blog.description
      })

      session.flash({ message: "Your blog has been posted."});
      return response.redirect('back')
  }

  // This function handle the delete the blog in our database and login user
  async delete({ response, session, params }) {
    const blog = await Blog.find(params.id);

    await blog.delete();
    session.flash({message: "Your Blog has been Deleted"});
    return response.redirect('back');
  }


  // this edit and updte functioon are use for edit the blog and udate the previous value
  async edit({ params, view, response }) {
     const blog = await Blog.find(params.id);
     return view.render('edit',{blog: blog})
  }
  async update({ response, request, session, params }) {
    const blog = await Blog.find(params.id);

    blog.title = request.all().title;
    blog.description = request.all().description;

    await blog.save();

    session.flash({message: "Your Blog has been updated."})
    return response.redirect('/post-a-blog')
  }
}


module.exports = BlogController;
