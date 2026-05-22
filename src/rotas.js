const express = require('express');
const { listarAlunos, criarAluno, atualizarAluno, deletarAluno } = require('./controllers/alunosController');
const { inserNotas } = require('./controllers/academicoController');
const rotas = express.Router();

rotas.get('/alunos', listarAlunos);
rotas.post('/alunos',criarAluno);
rotas.put('/alunos/:matricula/usuario',atualizarAluno);
rotas.delete('/alunos/:matricula',deletarAluno); 

rotas.post('/academico/notas',inserNotas);

module.exports = rotas;