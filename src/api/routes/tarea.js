const express = require('express')
const JsonPhService = require('../../services/jsonPh')
const RedisService = require('../../services/redis')
const router = express.Router()
module.exports = (app) => {
    app.use('/tarea', router)

    const JsonPh = new JsonPhService()
    const Redis = new RedisService()
    router.get('/', (req,res) => {
        res.status(200).send({
            message: 'todo bien'
        })
    })
    router.get('/posts', async (req,res, next) => {
        const posts = await JsonPh.get('/posts')
        res.status(200).send({
            message: 'post',
            result: posts
        })
    })
    router.get('/posts/:id', async (req,res) => {
        const {id} = req.params
        const post = await JsonPh.get('/posts/'+id)
        Redis.set(3, id.toString(), JSON.stringify(post))
        res.status(200).send(post)
    })
    router.get('/comments', async (req,res) => {
        const comments = await JsonPh.get('/comments')
        res.status(200).send(comments)
    })
    router.get('/comments/:id', async (req,res) => {
        const {id} = req.params
        const comments = await JsonPh.get('/comments' + id)
        res.status(200).send(comments)
    })
    router.get('/users', async (req,res) => {
        const users = await JsonPh.get('/users')
        res.status(200).send(users)
    })
    router.get('/users/:id', async (req,res) => {
        const {id} = req.params
        const users = await JsonPh.get('/comments' + id)
        res.status(200).send(users)
    })
}