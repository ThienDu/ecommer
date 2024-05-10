'use strict'

const StatusCode ={
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ResponseStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

class ErrorResponse extends Error {
    constructor(massage, status){
        super(message)
        this.status = status
    }
} 

class ConflictRequestError extends ErrorResponse {
   constructor(message = ResponseStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN){
    super(message, statusCode)
   } 
}

class BadRequestError extends ErrorResponse {
    constructor(massage = ResponseStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(massage, statusCode)
    }
}


const asyncHanlde = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    asyncHanlde
}