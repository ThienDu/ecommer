'use strict'

const httpStatusCode = require("../utils/httpStatusCode")

// const StatusCode ={
//     FORBIDDEN: 403,
//     CONFLICT: 409
// }

// const ResponseStatusCode = {
//     FORBIDDEN: 'Bad request error',
//     CONFLICT: 'Conflict error'
// }

class ErrorResponse extends Error {
    constructor(message, status){
        super(message)
        this.status = status
    }
} 

class ConflictRequestError extends ErrorResponse {
   constructor(message = httpStatusCode.reasonPhrases.CONFLICT, statusCode = httpStatusCode.statusCodes.FORBIDDEN){
    super(message, statusCode)
   } 
}

class BadRequestError extends ErrorResponse {
    constructor(massage = httpStatusCode.reasonPhrases.CONFLICT, statusCode =  httpStatusCode.statusCodes.FORBIDDEN) {
        super(massage, statusCode)
    }
}


class AuthFailureError extends ErrorResponse {
    constructor(massage = httpStatusCode.reasonPhrases.UNAUTHORIZED, statusCode =  httpStatusCode.statusCodes.UNAUTHORIZED){
        super(massage, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(massage = httpStatusCode.reasonPhrases.NOT_FOUND, statusCode =  httpStatusCode.statusCodes.NOT_FOUND){
        super(massage, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
}