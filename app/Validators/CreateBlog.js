'use strict'

class CreateBlog{
  get rules () {
    return {
      title: "required",
      description: "required"
    }
  }
  get messages(){
    return{
      'required': 'Woah now, {{ field }} is required.',
    }
  }

  async fails(error){
    this.ctx.session.withErrors(error)
    .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateBlog
