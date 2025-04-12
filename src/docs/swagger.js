const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gerenciamento de Tarefas',
            version: '1.0.0',
            description: 'Documentação completa da API de gerenciamento de tarefas',
            contact: {
                name: 'Suporte API',
                email: 'suporte@empresa.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token JWT obtido no endpoint /login'
                }
            },
            schemas: {
                Usuario: {
                    type: 'object',
                    required: ['nome', 'senha'],
                    properties: {
                        id: { 
                            type: 'integer',
                            example: 1
                        },
                        nome: { 
                            type: 'string',
                            example: 'joao.silva'
                        },
                        senha: { 
                            type: 'string',
                            format: 'password',
                            example: 'senha123'
                        }
                    }
                },
                Tarefa: {
                    type: 'object',
                    required: ['titulo', 'usuario_id'],
                    properties: {
                        id: { 
                            type: 'integer',
                            example: 1 
                        },
                        titulo: { 
                            type: 'string',
                            example: 'Fazer relatório mensal' 
                        },
                        descricao: { 
                            type: 'string',
                            example: 'Preparar relatório completo com métricas' 
                        },
                        concluido: { 
                            type: 'integer',
                            enum: [0, 1],
                            example: 0,
                            description: '0 = Não concluído, 1 = Concluído'
                        },
                        usuario_id: { 
                            type: 'integer',
                            example: 1 
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-01-01T12:00:00Z'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            customSiteTitle: 'API Tarefas - Documentação',
            customCss: '.swagger-ui .topbar { display: none }',
            swaggerOptions: {
                docExpansion: 'list',
                filter: true,
                persistAuthorization: true
            }
        })
    );
};