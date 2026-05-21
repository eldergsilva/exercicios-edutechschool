const { alunos } = require('../bancodedados');

const buscarAlunoPorMatricula = (matricula) => {
    return alunos.find((a) => String(a.matricula) === String(matricula));
};

module.exports = {
    buscarAlunoPorMatricula
}