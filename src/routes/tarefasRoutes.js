const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Tarefas
 *   description: Gerenciador de tarefas
 */

/**
 * @swagger
 * /tarefas/criar:
 *   post:
 *     tags: [Tarefas]
 *     summary: Cria uma nova tarefa
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Fazer relatório mensal"
 *               descricao:
 *                 type: string
 *                 example: "Preparar relatório de vendas do mês"
 *             required:
 *               - titulo
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Tarefa criada!"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Dados inválidos ou faltando
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tarefas/apagar/{id}:
 *   delete:
 *     tags: [Tarefas]
 *     summary: Remove uma tarefa existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser removida
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Tarefa apagada"
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /tarefas/consultar/{id}:
 *   get:
 *     tags: [Tarefas]
 *     summary: Consulta uma tarefa específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser consultada
 *     responses:
 *       200:
 *         description: Detalhes da tarefa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Fazer relatório mensal"
 *                 descricao:
 *                   type: string
 *                   example: "Preparar relatório de vendas do mês"
 *                 concluido:
 *                   type: string
 *                   enum: [Sim, Não]
 *                   example: "Não"
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/criar', autenticar, async (req, res) => {
    try {
        const id = await Tarefa.criar(req.body);
        res.status(201).json({ msg: 'Tarefa criada!', id });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            erro: error.message || 'Erro interno'
        });
    }
});
router.post('/apagar/:id', autenticar, async (req, res) => {
    try {
        const respos = await Tarefa.apagar(req.params.id);
        if (respos) {
            res.status(200).json({ msg: 'Tarefa apagada' });
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            erro: error.message || 'Erro interno'
        });
    }
});
router.get('/consultar/:id', autenticar, async (req, res) => {
    try {
        const tarefa = await Tarefa.consultar(req.params.id);
        console.log(tarefa);

        if (tarefa) {
            res.status(200).json({ id: tarefa.id, titulo: tarefa.titulo, descricao: tarefa.descricao, concluido: sim_nao(tarefa.concluido) });
        }
    } catch (error) {
        res.status(error.statusCode || 500).json({
            erro: error.message || 'Erro interno'
        });
    }
});

function sim_nao(value) {
    if (value == 0) {
        return 'Não'
    } else if (value == 1) {
        return 'Sim'
    }
}

module.exports = router;