//jshint esversion:6
let port = process.env.PORT ;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const mongoose = require('mongoose'); 
mongoose.connect("mongodb+srv://marubozu:qwerty%40123@cluster0.cq1vx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// const data_base =[]
const y= new mongoose.Schema({ 
    Title: {
       type: String,
        required: [true]
      },
    Content: {
         type:String,
         required:[true]
} })

const data_base = mongoose.model('data_base', y);
app.get('/', function (req, res) {
    data_base.find(function(err, db)
    {
        res.render('home', {data_base: db });
    })
   
})



app.get('/compose', function (req, res) {
  res.render('compose');
})
app.post('/compose', function (req, res) {
  const post ={
    Title : req.body.Title,
    Content : req.body.Content
  }
//   data_base.push(post)
const new_post= new data_base({ Title: post.Title, Content: post.Content });
new_post.save( function(err)
{
   if (err)
    console.log("error")
    else
    console.log("success")
})
//   for(var i=0; i < data_base.length; i++) 
//     console.log(data_base[i].Title)
  
   res.redirect("/")
})

app.get('/about', function (req, res) {
  res.render('about', {data :aboutContent});
})
app.get('/contact', function (req, res) {
  res.render('contact', {data : contactContent});
})

app.get("/:post", function (req, res) {
    data_base.find( function(err, db)
  {for(var i=0; i<db.length; i++)
   {
        if(db[i].Title == req.params.post )
         res.render('unique_page', {Title: db[i].Title, Content:db[i].Content });
   }}
    )
})





if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
}); 