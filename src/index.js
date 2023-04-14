const express = require('express')
const loaders = require('./loaders/index.js')
const { PORT, SERVER_URL } = require('./config.js')
const app = express()

async function startServer() {
    
    await loaders({ expressApp: app })
    app.listen(PORT, err => {
        if( err ) {
            console.log(err);
            return;
        }
        console.log(`Sevidor conectado`);
        console.log(SERVER_URL);
    }) 
    }
  startServer();