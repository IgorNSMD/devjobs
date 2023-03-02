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
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const createError = require('http-errors');
const passport = require('./config/passport');

require('dotenv').config({
    path:'variables.env'
})

const app = express();



// habilitar body-parser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));

// validación de campos
app.use(expressValidator());

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

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use('/',router())

// 404 pagina no existente
app.use((req, res, next) => {
    next(createError(404, 'No Encontrado'));
})

// Administración de los errores
app.use((error, req, res, next ) => {
    res.locals.mensaje = error.message;
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
});


app.listen(process.env.PUERTO)