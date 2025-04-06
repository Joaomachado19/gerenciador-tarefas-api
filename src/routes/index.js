const express = require('express');
const router = express.Router();
const authhRoutes = require('./authRoutes');
const autenticar = require('../middlewares/auth');

router.use('/auth', authhRoutes);

router.get('/', (req, res) => {
    res.send('GERENCIADOR DE TAREFAS');
});
module.exports = router;