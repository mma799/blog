const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./modals/blog')
const blogRoute = require('./routes/blogRoutes')
const { redirect } = require('express/lib/response')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded())

mongoose.connect('mongodb://localhost:27017/blog')
.then((result)=>console.log("connected to DB"))
.catch((err)=>{console.log("ops can not connect to DB")})

app.get('/',(req,res)=>{
    res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'about'})
})

app.use('/blogs',blogRoute)


app.use((req,res)=>{
    res.render('404',{title:'not found'})
})

app.listen(3000)