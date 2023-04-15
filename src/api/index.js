const express = require('express')
const rest = require('./routes/rest')
const tarea = require('./routes/tarea')
module.exports = () => {
    const app = express.Router()
    rest(app)
    tarea(app)
    return app
}