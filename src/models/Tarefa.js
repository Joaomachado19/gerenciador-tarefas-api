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


            const [result] = await Database.query(
                'INSERT INTO tarefas (titulo, descricao, usuario_id, concluido) values (?, ?, ?, ?)',
                [titulo, descricao, usuario_id, 0]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = Tarefa;