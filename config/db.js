const mongoose = require('mongoose')
require('dotenv').config({
    path:'variables.env'
})


mongoose.set("strictQuery", false);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true
})

mongoose.connection.on('error',(error) => {
    console.log(error)
})


