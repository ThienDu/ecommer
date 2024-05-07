'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb://localhost:27017/ecommer`
const {countConnect, checkOverload } = require('../helpers/check.connect')

class Database {
    constructor(){
        this.connect()
    }
    //connect
    connect(type ='mongodb'){
        mongoose.connect(connectString).then(_ => console.log(`connect mongo success`, countConnect(), checkOverload())).catch(err => console.log(`erorr`))
        //dev
        if(1 === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})

        }
    } 
    static getInstance() {
        if(!Database.instance){
            Database.instance =new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb