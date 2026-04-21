const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db', (erro) => {
    if (erro) {
        console.log("Erro no banco")
    } else {
        console.log("Banco conectado")
    }
})

// cria tabela pacientes
db.run(`
CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    endereco TEXT,
    observacoes TEXT
)
`)

// cria tabela atendimentos
db.run(`
CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER,
    data TEXT,
    pressao TEXT,
    alimentacao TEXT,
    observacoes TEXT
)
`)

module.exports = db