'use strict'


//level = 0

// const config = {
//     app: {
//         PORT: 3000
//     },
//     db:{
//         host: 'localhost',
//         port:27012,
//         name:'db'
//     }
// }


//level 01

const dev = {
    app: {
        PORT: process.env.DEV_DB_PORT || 3000
    },
    db:{
        host: process.env.DEV_DB_HOST  ||'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'dbDev'
    }
}


const pro = {
    app: {
        PORT: process.env.PRO_DB_PORT || 3000
    },
    db:{
        host: process.env.PRO_DB_HOST || 'localhost',
        port:process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'dbPro'
    }
}
 const config = {dev, pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]