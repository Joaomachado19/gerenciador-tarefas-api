const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const swaggerConfig = require('./docs/swagger');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));
swaggerConfig(app);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});