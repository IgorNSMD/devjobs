const mongoose = require('mongoose')
require('./config/db');

const express = require('express')
const exphbs  = require('express-handlebars')
const path = require('path')
const router = require('./routes')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo');
const bodyParse = require('body-parser');

require('dotenv').config({
    path:'variables.env'
})

const app = express();


// habilitar body-parser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));


// Habilitar express-handlebars como view
app.engine('handlebars',
    exphbs.engine({
        defaultLayout: 'layout',
        helpers:require('./helpers/handlebars')
    }));

app.set('view engine','handlebars')

//statics files
app.use(express.static(path.join(__dirname,'public')))

app.use(cookieParser())

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave:false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.DATABASE || 'mongodb://localhost:27017/devjobs'
    })
}))

app.use('/',router())

app.listen(process.env.PUERTO)