const { CustomApiError } = require("../errors/customError")

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({message: err.message})
    }
    return res.status(500).json({message: "Something went wrong, please try again"})
}

module.exports = errorHandlerMiddleware