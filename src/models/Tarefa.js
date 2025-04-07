const Database = require('../database/Database');

class Tarefa {
    static async criar(titulo, descricao, usuario_id) {
        const result = await Database.query(
            'INSERT INTO tarefas (titulo, descricao, usuario_id, concluido) values (?, ?, ?, ?)',
            [titulo, descricao, usuario_id, 0]
        );
        return result.insertId;
    }
}
module.exports = Tarefa;