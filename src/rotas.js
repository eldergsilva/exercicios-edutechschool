const express = require('express');
const { listarAlunos, criarAluno, atualizarAluno } = require('./controllers/alunos');
const rotas = express.Router();

rotas.get('/alunos', listarAlunos);
rotas.post('/alunos',criarAluno);
rotas.put('/alunos/:matricula/usuario',atualizarAluno);
 

module.exports = rotas;