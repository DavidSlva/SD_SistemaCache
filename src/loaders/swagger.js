const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'cache api',
        version: '1.0.0',
        description: 'Pruebas de caché con redis'
      }
    },
    apis: ['../api/index.js'] // Especifica la ruta a tus archivos de controladores
  };

  const swaggerSpec = swaggerJsdoc(options);



  module.exports = swaggerSpec