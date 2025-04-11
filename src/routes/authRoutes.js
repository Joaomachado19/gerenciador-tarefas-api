const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { nome, senha } = req.body;
        const usuario = await Usuario.buscarPorNome(nome);

        if (!usuario || !(await Usuario.verificarSenha(senha, usuario.senha))) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome},
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no servidor' });
        console.log(error);
    }
});

module.exports = router;