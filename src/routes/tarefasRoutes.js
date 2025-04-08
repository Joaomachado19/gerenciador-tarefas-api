const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');
const autenticar = require('../middlewares/auth');

router.post('/criar', autenticar, async (requestAnimationFrame, res) => {
    try {
        const id = await Tarefa.criar(req.body);
        res.status(201).json({id});
    } catch (error) {
        res.status(error.statusCode || 500).json({
            erro: error.message || 'Erro interno'
        });
    }
});

module.exports = router;