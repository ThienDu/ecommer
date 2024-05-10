'use strict'

const StatusCode ={
    OK: 200,
    CREATED: 201
}

const ResponStatusCode = {
    OK: 'Success',
    CREATED: 'Created'
}

class SuccessResponse {
    constructor({message, statusCode = StatusCode.OK, responStatusCode = ResponStatusCode.OK, metadata = {}}){
        this.message = !message ? responStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }

    send(res, metadata = {}){
        return res.status(this.status).json(this)
    }
}
class OK extends SuccessResponse {
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse{
    constructor({message, statusCode = StatusCode.CREATED, responStatusCode = ResponStatusCode.CREATED, metadata}){
        super({message, statusCode, responStatusCode, metadata})
    }
}

module.exports = {
    OK,
    CREATED
}