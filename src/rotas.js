const express = require('express');
const { listarAlunos, criarAluno, atualizarAluno, deletarAluno } = require('./controllers/alunosController');
const { inserNotas,registrarFaltas,transferirAluno,consultarSituacaoPorMateria,consultarAprovacaoDeAno } = require('./controllers/academicoController');
const rotas = express.Router();

rotas.get('/alunos', listarAlunos);
rotas.post('/alunos',criarAluno);
rotas.put('/alunos/:matricula/usuario',atualizarAluno);
rotas.delete('/alunos/:matricula',deletarAluno); 

rotas.post('/academico/notas',inserNotas);
rotas.post('/academico/faltas',registrarFaltas);
rotas.post('/academico/transferir',transferirAluno);
rotas.get('/alunos/situacao', consultarSituacaoPorMateria);
rotas.get('/alunos/aprovacao',consultarAprovacaoDeAno)

module.exports = rotas;

 