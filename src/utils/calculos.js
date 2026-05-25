const { alunos, materias, notas, faltas } = require('../bancodedados');

const buscarAlunoPorMatricula = (matricula) => {
    return alunos.find((a) => String(a.matricula) === String(matricula));
};

const buscarMateriaValida = (materia) => {
    return materias.find((m) => m === materia);
};

const calcularSituacaoPorMateria = (matricula) => {
    return materias.map(materia => {
        const notasAluno = notas.filter(nota => nota.matricula === matricula && nota.materia === materia);
        const faltasAluno = faltas.filter(falta => falta.matricula === matricula && falta.materia === materia);
        const media = notasAluno.length > 0 ? notasAluno.reduce((acc, nota) => acc + nota.valor, 0) / notasAluno.length : null;
        const total_faltas = faltasAluno.length;
        let situacao = 'Sem registros';
        if (media !== null) {
            if (media >= 6 && total_faltas <= 10) situacao = 'Aprovado';
            else if (total_faltas > 10) situacao = 'Reprovado por falta';
            else situacao = 'Reprovado';
        }
        return { materia, media, total_faltas, situacao };
    });
};

module.exports = {
    buscarAlunoPorMatricula,
    buscarMateriaValida,
    calcularSituacaoPorMateria
};