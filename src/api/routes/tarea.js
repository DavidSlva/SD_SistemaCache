const { default: axios } = require('axios')
const express = require('express')
const { apiURL, SERVER_URL } = require('../../config')
const { generarValorUnoA } = require('../../util/rand')
const RedisService = require('../../services/redis')
const router = express.Router()

// Número de consultas
const nConsultas = 1000

module.exports = (app) => {
    app.use('/tarea', router)

    /**
     * Ruta de obtención de post sin utilizar caché (ni ninguna técnica)
     */
    const Redis = new RedisService()
    router.get('/vanilla', async (req, res) => {
        try {
            await Redis.flushRedis()
            let value;
            // Inicio tiempo
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/vanilla/posts/${id}`)
            }
            // FIN tiempo
            //Devolver tiempo total
            res.send(value)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    })
    /**
     * Ruta de obtención de post utilizando TTL = 60s
     */
    router.get('/ttl', async (req, res) => {
        try {
            let value;
            await Redis.flushRedis()
            // Inicio tiempo
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/cache/ttl/${id}`)
            }
            // FIN tiempo
            //Devolver tiempo total
            res.send(value)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    })
    /**
     * Ruta de obtención de post utilizando las siguientes técnicas
     * - TTL: 1s
     * - Técnica de Particionamiento
     * - Política de remoción LFU
     * - Tamaño del caché 500MB (Definido en el docker-compose)
     */
    router.get('/all-techniques', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            await Redis.flushRedis()
            const start = new Date().getMilliseconds()
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/cache/all-techniques/${id}`)
            }
            const end = new Date().getMilliseconds()
            const time = end - start
            res.send({time})
        } catch (error) {
            res.send(error)
        }
    })
    /**
     * Ruta de obtención de post utilizando las siguientes técnicas
     * - TTL: 800s
     * - Técnica de Particionamiento
     * - Política de remoción LFU
     * - Tamaño del caché 10MB (Definido en el docker-compose)
     * - Solo utilizamos el caché 1 
     */
    router.get('/client1/all-techniques', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            await Redis.flushRedis()
            const start = new Date().getMilliseconds()
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/posts/cache/client1/all-techniques/${id}`)
            }
            const end = new Date().getMilliseconds()
            const time = end - start
            res.send({time})
        } catch (error) {
            res.send(error)
        }
    })
    router.get('/lfu', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            await Redis.flushRedis()
            const start = new Date().getMilliseconds()
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/cache/lfu/${id}`)
            }
            const end = new Date().getMilliseconds()
            const time = end - start
            res.send({time})
        } catch (error) {
            res.send(error)
        }
    })
    router.get('/ttluncachelfu', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            await Redis.flushRedis()
            const start = new Date().getMilliseconds()
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/cache/ttluncachelfu/${id}`)
            }
            const end = new Date().getMilliseconds()
            const time = end - start
            res.send({time})
        } catch (error) {
            res.send(error)
        }
    })
    router.get('/uncachettl', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            await Redis.flushRedis()
            const start = new Date().getMilliseconds()
            for(let i = 0; i < nConsultas; i++){
                const id = generarValorUnoA(100)
                value = await axios.get(`${SERVER_URL}/rest/cache/uncachettl/${id}`)
            }
            const end = new Date().getMilliseconds()
            const time = end - start
            res.send({time})
        } catch (error) {
            res.send(error)
        }
    })
    
    
}