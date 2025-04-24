const Database = require('../database/Database');
// const { ValidationError, DatabaseError } = require('../errors');

class Tarefa {
    static async criar(tarefa) {
        try {
            // const requiredFields = ['titulo'];
            // const missingFields = requiredFields.filter(field => !tarefa[field]);
            // if (missingFields.length > 0) {
            //     throw new ValidationError(`Campos obrigatórios: ${missingFields.join(', ')}`);
            // }


            const result = await Database.query(
                'INSERT INTO tarefas (titulo, descricao, usuario_id, concluido) values (?, ?, ?, ?)',
                [tarefa.titulo, tarefa.descricao, 1, 0]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
    static async apagar(tarefa_id) {
        try {
            await Database.query(
                'DELETE FROM tarefas WHERE id = ?',
                [tarefa_id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Tarefa não encontrada');
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
    static async consultar(tarefa_id) {
        try {
            const result = await Database.query(
                'SELECT * FROM tarefas where id = ?',
                [tarefa_id]
            );

            if (!result) {
                throw new Error('Tarefa não encontrada');
            }

            return result[0];
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Tarefa;