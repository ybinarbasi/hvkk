const express = require('express')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Path = require('path')
const app = express()
const port = 3000
const fileUpload = require('express-fileupload');
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(express.static('public'))
const hostname = '127.0.0.1';

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

//const MongoStore = require('connect-mongo').default;

app.use(session({
  secret: 'test',
  resave:false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))


//flash messages
/* app.use((req, res, next) =>{
    res.locals.successFlash = req.session.successFlash;

    delete req.session.successFlash;
    next();
}) */

app.use(fileUpload());
app.engine("handlebars", exphbs.engine());
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.use((req,res,next)=>{

    const {userId} =req.session
    if(userId){
        res.locals= {
        displaylink :true
        }

    }
    else{
        res.locals={
            displaylink : false
        }
    }
next();

})


const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')

app.use('/',main)
app.use('/posts',posts) 
app.use('/users',users) 



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

