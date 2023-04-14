const express = require('express')
const loaders = require('./loaders/index.js')
const { PORT } = require('./config.js')
const app = express()

async function startServer() {
    
    await loaders({ expressApp: app })
    app.listen(PORT, err => {
        if( err ) {
            console.log(err);
            return;
        }
        console.log(`Sevidor listo:`);
    }) 
    }
  startServer();
  

// const axios = require('axios');

// // const API_URL = 'https://digimon-api.vercel.app/api/digimon';
// const API_URL = 'https://jsonplaceholder.typicode.com';
// const convert = require('xml-js')
// const { performance } = require('perf_hooks');

// const cron = require('node-cron');

// const callAPi = async (param) => {
//     try {
//         const response = await axios.get(`${API_URL}/${param}`);
//         console.log(response);
//         return response
        
//     } catch (error) {
//         console.log(error);
//         return error
//     }
// }
// const getUsers = async () => {
//     try {
//         return await callAPi('todos')
//     } catch (error) {
//         return error
//     }
// }
// const getComments = async () => {
//     try {
//         return await callAPi('comments')
//     } catch (error) {
//         return error
//     }
// }
// const posts = async () => {
//     try {
//         return await callAPi('posts')
//     } catch (error) {
//         return error
//     }
// }

// module.exports = {
//     getData,
//     API_URL
// }

