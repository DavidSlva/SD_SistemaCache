const { default: axios } = require('axios')
const express = require('express')
const { apiURL, SERVER_URL } = require('../../config')
const router = express.Router()
module.exports = (app) => {
    app.use('/tarea', router)
    router.get('/vanilla', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            for(let i = 0; i < 1000; i++){
                value = await axios.get(`${SERVER_URL}/rest/vanilla/posts/1`)
            }
            // FIN tiempo
            //Devolver tiempo total
            res.send(value)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    })
    router.get('/ttl', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            for(let i = 0; i < 1000; i++){
                value = await axios.get(`${SERVER_URL}/rest/cache/ttl/1`)
            }
            // FIN tiempo
            //Devolver tiempo total
            res.send(value)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    })
    router.get('/all-techniques', async (req, res) => {
        try {
            let value;
            // Inicio tiempo
            for(let i = 0; i < 1000; i++){
                value = await axios.get(`${SERVER_URL}/rest/cache/all-techniques/1`)
            }
            // FIN tiempo
            //Devolver tiempo total con la cantidad de consultas que se hicieron
            // res.send({
            //     time: "1000mm",
            //     queries: '1000',
            //     tecnique: 'all-tec'
            // })
            res.send(value)
        } catch (error) {
            // console.log(error);
            res.send(error)
        }
    })
}