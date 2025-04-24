const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Autentica um usuário e retorna um token JWT
 *     description: Verifica as credenciais do usuário e retorna um token de acesso válido por 8 horas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "admin"
 *                 description: Nome de usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "senha123"
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Credenciais inválidas"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro no servidor"
 */
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