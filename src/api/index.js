const express = require('express')
const tarea = require('./routes/tarea')
module.exports = () => {
    const app = express.Router()
    tarea(app)
    return app
}