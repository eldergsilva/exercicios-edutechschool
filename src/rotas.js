const express = require('express');
const { listarAlunos, criarAluno } = require('./controllers/alunos');
const rotas = express.Router();

rotas.get('/alunos', listarAlunos);
rotas.post('/alunos',criarAluno);
 

module.exports = rotas;