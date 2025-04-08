const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const autenticar = require('../middlewares/auth');
const tarefasRoutes = require('../routes/tarefasRoutes');

router.use('/auth', authRoutes);
router.use('/tarefas', tarefasRoutes);

router.get('/', (req, res) => {
    res.send('GERENCIADOR DE TAREFAS');
});
module.exports = router;