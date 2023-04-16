const express = require('express')
const rest = require('./routes/rest')
const tarea = require('./routes/tarea')
const redis = require('./routes/redis')
const grpc = require('./routes/grpc')
module.exports = () => {
    const app = express.Router()
    rest(app)
    tarea(app)
    redis(app)
    grpc(app)
    return app
}