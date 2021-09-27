const express = require("express")
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require("./db/connect")
require("dotenv").config()

const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/errorHandler")

const PORT = process.env.PORT || 3030

// middleware
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks", tasks)
app.use(notFound)

// error handler
app.use(errorHandlerMiddleware)

// start the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
