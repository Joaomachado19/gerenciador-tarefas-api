const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const swaggerConfig = require('./docs/swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', routes);

swaggerConfig(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});