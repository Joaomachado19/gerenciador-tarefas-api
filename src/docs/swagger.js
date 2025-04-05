const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '1.0.0',
        info: {
            title: 'API de Gerenciamento de tarefas.',
            version: '1.0.0',
            description: 'Documentação da API.',
        },
        servers: [
            {
                url: '<http://localhost:3000>',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};