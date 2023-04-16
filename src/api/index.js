const express = require('express')
const rest = require('./routes/rest')
const tarea = require('./routes/tarea')
const redis = require('./routes/redis')
module.exports = () => {
    const app = express.Router()
    rest(app)
    tarea(app)
    redis(app)
    return app
}