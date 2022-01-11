//jshint esversion:6
let port = process.env.PORT ;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://marubozu:qwerty%40123@cluster0.cq1vx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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