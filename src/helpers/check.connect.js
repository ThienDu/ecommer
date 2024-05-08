'use strict'

const { default: mongoose } = require("mongoose")
const os = require('os')
const process = require('process')
const _SECONDS = 5000

const countConnect = () =>{
    const numConnection =mongoose.connections.length
    console.log(`Number of connection ${numConnection}`)
}
// check overload connect
const checkOverload = () => {
    // setInterval(() => {
    //     const numConnection = mongoose.connections.length
    //     const numCores = os.cpus().length
    //     const memoryUsage = process.memoryUsage().rss
    //     //Example maximum number of connection is 5
    //     const maxConnections = numCores*5
    //     console.log(`NumbeConnection use `, numConnection)
    //     console.log(`Memory Use ${memoryUsage/1024/1024} MB`)
    //     if(numConnection > maxConnections) console.log(`Connectione Overload detected!!`) 
    // }, _SECONDS) // Monitor every 5 seconds
}

module.exports = {countConnect, checkOverload}