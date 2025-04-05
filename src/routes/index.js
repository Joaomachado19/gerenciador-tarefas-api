const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GERENCIADOR DE TAREFAS');
});
module.exports = router;