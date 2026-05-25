const { buscarAlunoPorMatricula, buscarMateriaValida, calcularSituacaoPorMateria } = require('../utils/calculos');
const { alunos, notas, faltas, escola, materias, transferencias } = require('../bancodedados');


const inserNotas = (req,res)=>{
 const { matricula, materia, valor } = req.body;
   if (!matricula || !materia || valor === undefined) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }
 const buscaAluno = buscarAlunoPorMatricula(matricula);
   if (!buscaAluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }
    
   const materiaValida = buscarMateriaValida(materia);
    if (!materiaValida) {
        return res.status(400).json({ mensagem:"Matéria inválida! Consulte as matérias disponíveis." });
    } 
        if (typeof valor !== 'number' || valor < 0 || valor > 10) {             
     
  return res.status(400).json({mensagem:'A nota deve ser um número entre 0 e 10!'});
    }

    const novaNota = {
    data: new Date().toLocaleString('pt-BR'),
    matricula,
    materia,
    valor
   };  
    notas.push(novaNota);
    return res.status(201).send(); 


}

const registrarFaltas =( req,res)=>{
    const { matricula, materia } = req.body;
    if (!matricula || !materia) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }
    const buscaAluno = buscarAlunoPorMatricula(matricula);
    if (!buscaAluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }
    const materiaValida = buscarMateriaValida(materia);
    if (!materiaValida) {
        return res.status(400).json({ mensagem: "Matéria inválida! Consulte as matérias disponíveis." });
    }

    const novaFalta = {
    data: new Date().toLocaleString('pt-BR'),
    matricula,
    materia
   };
   faltas.push(novaFalta);

  return res.status(201).send();

}

const transferirAluno = (req,res)=>{    
    const { matricula, turma_origem, turma_destino, senha } = req.body;
    if (!matricula || !turma_origem || !turma_destino || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    } 

    const aluno = buscarAlunoPorMatricula(matricula);

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    } 

    if (aluno.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida para o aluno!' });
    }

    if (aluno.turma !== turma_origem) {
        return res.status(400).json({ mensagem: 'A turma de origem não corresponde à turma atual do aluno!' });
    }
    if (turma_origem === turma_destino) {
        return res.status(400).json({ mensagem: 'As turmas de origem e destino não podem ser iguais!' });
    }
    
    const novaTransferencia = {
        data: new Date().toLocaleString('pt-BR'),
        matricula,
        turma_origem,
        turma_destino
    };

    transferencias.push(novaTransferencia);
     aluno.turma = turma_destino;

     return res.status(204).send();      
    
}


const calcularSituacaoPorMateria = (matricula) => {
    return materias.map(materia => {
        const notasAluno = notas.filter(nota => nota.matricula === matricula && nota.materia === materia);
        const faltasAluno = faltas.filter(falta => falta.matricula === matricula && falta.materia === materia);

         // JUSTAR IMPORTAÇÂO DE CALCULO !!!
        return { materia, media, totalFaltas, situacao };
    });
};

const consultarSituacaoPorMateria = (req,res)=>{
    const { matricula, senha } = req.query;
    if (!matricula || !senha) {
        return res.status(400).json({ mensagem: 'Matricula e senha são obrigatórios!' });
    }
    const aluno = buscarAlunoPorMatricula(matricula);

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }
    if (aluno.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida!' });
    }

    // JUSTAR IMPORTAÇÂO DE CALCULO !!!

    return res.status(200).json({ situacaoPorMateria });
}

const consultarAprovacaoDeAno=(req,res)=>{
    const { matricula, senha } = req.query;

    if (!matricula || !senha) {
        return res.status(400).json({ mensagem: 'Matricula e senha são obrigatórios!' });
    }
    const aluno = buscarAlunoPorMatricula(matricula);

    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }
    if (aluno.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida!' });
    }

    // JUSTAR IMPORTAÇÂO DE CALCULO !!!
    
    const novoResultadoFinal ={
    resultado,
    materiasAprovadas,
    materiasAprovadas
    }
    
    return res.status(200).json({novoResultadoFinal})

}

   



 
 /*  AS NOTAS ESTÂO EM inserNotas(
 const novaNota = { data: new Date().toLocaleString('pt-BR'), matricula, materia,valor }; notas.push(novaNota);
 Dessa forma preciso percorrer o array de notas e verificar onde o aluno da matricula em questão esta mencionado e ir acumulando pra  ver se :
- Aprovado em todas → `"Aprovado"`
- Reprovado em 1 ou 2 matérias → `"Recuperação"`
- Reprovado em 3 ou mais → `"Reprovado"`
dai retorno a situação de aprvado ou não junto com os resultados 
 
{
    "resultado": RESOLTADO TOTAL ,
    "materias_reprovadas": [ARRAY DAS REPROVADAS ],
    "materias_aprovadas": [ARRAY DAS APROVADAS ]
}
 

*/
 
 module.exports = {
    inserNotas,
    registrarFaltas,
    transferirAluno,
    consultarSituacaoPorMateria,
    consultarAprovacaoDeAno

}
