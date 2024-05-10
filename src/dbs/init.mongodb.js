'use strict'

const mongoose = require('mongoose')
const {db: {host, port, name}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`
const {countConnect, checkOverload } = require('../helpers/check.connect')

class Database {
    constructor(){
        this.connect()
    }
    //connect
    connect(type ='mongodb'){
        mongoose.connect(connectString).then(_ => console.log(`connect mongo success`, connectString))
        .catch(err => console.log(`erorr`, connectString))
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