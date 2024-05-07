'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb://localhost:2075/ecommer`
mongoose.connect(connectString).then(_ => console.log(`connect mongo success`)).catch(err => console.log(`erorr`))


//dev
if(1 === 0){
    mongoose.set('debug', true)
    mongoose.set('debug', {color: true})

}

module.exports = mongoose