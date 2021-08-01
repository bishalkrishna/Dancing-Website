const express=require("express");
const path =require("path");
const app=express();
var mongoose=require('mongoose');
//for post things
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/ContactDance',{useNewUrlParser:true,useUnifiedTopology:true});

// const fs=require("fs")

// const port=80;
const port=process.env.PORT ||80;

//define mongoose scheema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String,
});
const Contact = mongoose.model('Contact', contactSchema);

//for serving static files
app.use('/static',express.static('Static'))
//fetching data to express
app.use(express.urlencoded())
//set the template engine as pug
app.set('view engine','pug')
//set the views directory
app.set('views',path.join(__dirname,'views'))
//our pug demo endpoint   views=template
app.get('/contact', (req, res)=>{
      
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been saved to the Database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    })
  
   
    // res.status(200).render('contact.pug');
})

app.get('/', (req, res)=>{ 
    
    res.status(200).render('home.pug');
});


app.listen(port,()=>{
    console.log(`The application started successfullly on port ${port}`);
})
