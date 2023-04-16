const express = require('express')
const JsonPhService = require('../../services/jsonPh')
const RedisService = require('../../services/redis')
const { client, PostRequest } = require('../../loaders/grpc')
const router = express.Router()
const TTLValue = 1

// const request = new PostRequest();

module.exports = (app) => {
    app.use('/grpc', router)

    const JsonPh = new JsonPhService()
    const Redis = new RedisService()

    /**
     * Ruta de obtención de post sin utilizar caché (ni ninguna técnica)
     */
    router.get('/vanilla/posts/:id', async (req, res) => {
        const {id} = req.params


        const value = await client.GetPost({id: '1'}, (err, value) => {
            console.log(err, value);
        })

        console.log(value);
        return res.status(200).send({message: 'hola'})
    })

    /**
     * Ruta de obtención de post usando caché
     * - No estamos utilizando TTL
     */
    router.get('/cache/posts/:id', async (req, res) => {
        const {id} = req.params
        // Obtenemos el valor desde el caché
        let storedValue = await Redis.get(id)
        // Si no existe, se obtiene de la API y se almacena en caché
        if(!storedValue){
            storedValue = await JsonPh.get('/posts/'+id)
            Redis.store(id, JSON.stringify(post))
        }
        // Enviamos el resultado al cliente
        res.status(200).send(storedValue)
    })


    /**
     * Ruta de obtención de post utilizando TTL = TTLValue
     */
    router.get('/cache/ttl/:id', async (req,res) => {
        const {id} = req.params
        let storedValue = await Redis.get(id)
        if(!storedValue){
            storedValue = await JsonPh.get('/posts/'+id)
            Redis.store(id, JSON.stringify(post), TTLValue)
        }
        res.status(200).send(storedValue)
    })

    /**
     * Ruta de obtención de post utilizando las siguientes técnicas
     * - TTL: TTLValue
     * - Técnica de Particionamiento
     * - Política de remoción LFU
     * - Tamaño del caché 500MB (Definido en el docker-compose)
     */
    router.get('/cache/all-techniques/:id', async (req,res) => {
        const {id} = req.params
        // Cambiamos la política de remoción a LFU
        Redis.setLFUPolitic()
        let storedValue = await Redis.get(id)
        if(!storedValue){
            storedValue = await JsonPh.get('/posts/'+id)
            Redis.store(id, JSON.stringify(storedValue), TTLValue)
        }
        res.status(200).send(storedValue)
    })


    router.get('/posts/cache/client1/all-techniques/:id', async (req, res) => {
        const {id} = req.params
        // Cambiamos la política de remoción a LFU
        Redis.setLFUPolitic()
        let storedValue = await Redis.getClient1(id)
        if(!storedValue){
            storedValue = await JsonPh.get('/posts/'+id)
            Redis.storeInClient1(id, JSON.stringify(storedValue), TTLValue)
        }
        res.status(200).send(storedValue)
    })
}