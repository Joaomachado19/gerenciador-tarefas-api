const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const autenticar = require('../middlewares/auth');

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
    res.send('GERENCIADOR DE TAREFAS');
});
module.exports = router;