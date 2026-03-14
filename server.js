const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const filmes = [
    {
        id: 1,
        nome: "Shrek",
        genero: "Fantasia",
    },
    {
        id: 2,
        nome: "A era do Gelo 3",
        genero: "Animação",
    },
    {
        id: 3,
        nome: "Velozes e Furiosos",
        genero: "Ação",
    },
    {
        id: 4,
        nome: "Shrek",
        genero: "Fantasia",
    },
    {
        id: 5,
        nome: "Jumanji",
        genero: "Aventura",
    },
];

app.get("/", (req, res) => {
    res.send("API de Filmes")
});

app.get("/filmes", (req, res) => {
    res.json(filmes);
});

app.get("/filmes/:id", (req, res) => {
    const idQueFoiPegoNaURL = Number(req.params.id);
    const filmeEncontrado = filmes.find((filmes) => filmes.id === idQueFoiPegoNaURL);

    res.json(filmeEncontrado);
});

app.post("/filmes", (req, res) => {

    filmes.push(req.body);
    res.send("Filme cadastrado com sucesso!")
});

app.listen( PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});