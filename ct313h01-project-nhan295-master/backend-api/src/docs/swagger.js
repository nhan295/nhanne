const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const Options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
        title: 'BookShop API',
        version: '1.0.0',
        description: 'BookShop API',
    },
        servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        },
        ],
    },
    apis: ['./src/routes/*','./src/docs/components.yaml'],
};

const specs = swaggerJsDoc(Options);
module.exports = {
    specs,
    swaggerUi
};
