const express = require('express');
const mongoose= require('mongoose');
const methodOverride = require('method-override');
const articleRoutes = require('./routes/articles');
const Article = require('./models/articles')



const app = express();


mongoose.connect('mongodb://localhost:27017/blog', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
});
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended:false }))
app.set('view engine','ejs')  
app.use('/articles', articleRoutes);



app.get('/',async (req,res)=>{
    const articles =  await Article.find().sort({createdAt: 'desc'}); 
    res.render('articles/index', { articles });
})



app.listen(5000,()=>{
    console.log(`App is up and running on : http://localhost:5000/`);
})