require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const assetRoutes = require('./routes/assetRoute')
const agencyRoutes = require('./routes/agencyRoute')
const userRoutes = require('./routes/userRoute')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const auth = require("./middleware/auth");


const PORT = process.env.PORT || 8080;
// express app
const app = express()

// create doc
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
/// get access to the data pass in parameters of the call.
app.use(express.json())

// login and register
app.use('/api/users', userRoutes)

// verify the token
app.use(auth.verifyToken, (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/assets', assetRoutes)
app.use('/api/agencies', agencyRoutes)


// connect to db 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
        console.log(`Connected to db & listening on port ${PORT} 😃`)
        })
    })
    .catch((error) => {
        console.log(error);
    })
