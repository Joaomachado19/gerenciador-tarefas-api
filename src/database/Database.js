const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    static instance;

    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10
        };

        this.pool = mysql.createPool(this.config);
        Database.instance = this;
    }

    //Executar query
    async query(sql, params = []) {
        try {
            const [rows] = await this.pool.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
            throw error;
        }
    }

    //Fechar conexão
    async close() {
        try {
            await this.pool.end();
            console.log('Conexão com o banco de dados fechada');
        } catch (error) {
            console.error('Erro ao fechar a conexão:', error);
            throw error;
        }
    }
};

module.exports = new Database();