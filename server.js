const express = require('express')
const app = express()

const db = require('./db')

// permite json
app.use(express.json())

// rota inicial
app.get('/', (req, res) => {
  res.send("API funcionando")
})

app.get('/pacientes', (req, res) => {

  db.all("SELECT * FROM pacientes", [], (erro, dados) => {

    if (erro) {
      res.send("Erro ao buscar pacientes")
    } else {
      res.json(dados)
    }

  })

})

app.post('/pacientes', (req, res) => {

  let nome = req.body.nome
  let idade = req.body.idade
  let endereco = req.body.endereco
  let observacoes = req.body.observacoes

  db.run(
    "INSERT INTO pacientes(nome,idade,endereco,observacoes) VALUES (?,?,?,?)",
    [nome, idade, endereco, observacoes],

    function(erro){

      if (erro) {
        res.send("Erro ao cadastrar")
      } else {
        res.json({
          mensagem: "Paciente cadastrado",
          id: this.lastID
        })
      }

    }
  )

})

app.get('/atendimentos', (req, res) => {

  db.all("SELECT * FROM atendimentos", [], (erro, dados) => {

    if (erro) {
      res.send("Erro")
    } else {
      res.json(dados)
    }

  })

})

app.post('/atendimentos', (req, res) => {

  let paciente_id = req.body.paciente_id
  let data = req.body.data
  let pressao = req.body.pressao
  let alimentacao = req.body.alimentacao
  let observacoes = req.body.observacoes

  db.run(
    "INSERT INTO atendimentos(paciente_id,data,pressao,alimentacao,observacoes) VALUES (?,?,?,?,?)",
    [paciente_id, data, pressao, alimentacao, observacoes],

    function(erro){

      if (erro) {
        res.send("Erro ao salvar")
      } else {
        res.json({
          mensagem: "Atendimento salvo",
          id: this.lastID
        })
      }

    }
  )

})

app.get('/historico/:id', (req, res) => {

  let id = req.params.id

  db.all(
    "SELECT * FROM atendimentos WHERE paciente_id = ?",
    [id],

    (erro, dados) => {

      if (erro) {
        res.send("Erro")
      } else {
        res.json(dados)
      }

    }
  )

})


// servidor
app.listen(3000, () => {
  console.log("Rodando na porta 3000")
})