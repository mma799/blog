const Blog = require('../modals/blog')

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
        .then((blog)=>res.render('index',{title:'all blogs', blogs:blog}))
        .catch((err)=> console.log(err))
}

const blog_details = (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then(result=>{
            res.render('details',{blog:result,title:'blog details'})
        })
        .catch(err=>console.log(err))
}

const blog_create_get = (req,res)=>{
    res.render('create',{title:'create new blog'})
}

const blog_create_post = (req,res)=>{
    console.table(req.body)
    const blog = Blog(req.body)
    blog.save()
        .then(result=>{
            res.redirect('/blogs')
            console.log('added new blog')
        })
        .catch(err=>console.log(err))
}

const blog_delete = (req,res)=>{
    const id =req.params.id
    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect:'/'})    
        })
    .catch(err=>console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_post,
    blog_create_get,
    blog_delete
}
