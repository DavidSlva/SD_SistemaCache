const express = require('express');
const RedisService = require('../../services/redis');
const router = express.Router()

module.exports = (app) => {
    app.use('/redis', router);
    const Redis = new RedisService()
    router.get('/flush', (req, res) => {
        Redis.flushRedis()
        res.send({
            message: 'Redis 1, 2 y 3 Limpios'
        })
    })
}