function errorHandler(err,req,res,next){
    
    // console.log(err, "<<< errorHandler")

    let statusCode = ''
    let errorMessage = ''
    let errorCode = ''

    console.log(err)
    
    switch(err.name){
        case 'TOKEN_ERROR': 
            statusCode = 404
            errorCode = err.name
            errorMessage = 'Token Not Found'
            break
        case 'NOT_FOUND_ERROR': 
            statusCode = 404
            errorCode = err.name
            errorMessage = err.message || `Data not found`
            break
        case 'CREATE_FAILED':
            statusCode = 400
            errorCode = err.name
            errorMessage = 'Registration New User Failed'
            break
        case 'AUTHENTICATION_FAILED':
            statusCode = 401
            errorCode = err.name
            errorMessage = 'Authentication Error'
            break
        case 'SequelizeValidationError':
            statusCode = 400
            errorCode = 'VALIDATION_ERROR'
            const validationErrors  = []
            err.errors.forEach(element => {
                validationErrors.push(element.message)
            });
            errorMessage = validationErrors
            break
        default:
            statusCode = 500
            errorMessage = 'internal error server'
            errorCode = 'INTERNAL_ERROR_SERVER'
    }

    res.status(statusCode).json({
        errorCode,
        message: errorMessage
    })
}

module.exports = errorHandler