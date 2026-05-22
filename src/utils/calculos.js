const { alunos,materias } = require('../bancodedados');

const buscarAlunoPorMatricula = (matricula) => {
    return alunos.find((a) => String(a.matricula) === String(matricula));
};
const buscarMateriaValida = (materia) => {
    return materias.find((m) => m === materia);
}


module.exports = {
    buscarAlunoPorMatricula,
    buscarMateriaValida

}