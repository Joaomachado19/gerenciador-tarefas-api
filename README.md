## API DE GERENCIADOR DE TAREFAS

#### Scripts SQL para criar as tabelas do projeto
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);
CREATE TABLE tarefas (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    usuario_id INT,
    concluido TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);