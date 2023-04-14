const bodyParser = require('body-parser')
const cors =  require('cors')
const morgan =  require('morgan')
const express = require('express')
const routes = require('../api/index.js')

module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).end()
    })
    app.head('/status', (req, res) => {
        res.status(200).end()
    })
    app.use(cors())
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(express.json());
    app.use('/api', routes())
}