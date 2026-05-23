 const {buscarAlunoPorMatricula,buscarMateriaValida} = require('../utils/calculos');
 const { alunos, notas, escola,transferencias } = require('../bancodedados');

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

    const situacao_por_materia = materias.map(materia => {
        const notasAluno = notas.filter(nota => nota.matricula === matricula && nota.materia === materia);
        const faltasAluno = faltas.filter(falta => falta.matricula === matricula && falta.materia === materia); 

        const media = notasAluno.length > 0 ? notasAluno.reduce((acc, nota) => acc + nota.valor, 0) / notasAluno.length : null;
        const total_faltas = faltasAluno.length;       
        let situacao = 'Sem registros';

        if (media !== null) {
            if (media >= 7 && total_faltas <= 10) {
                situacao = 'Aprovado';
            } else if (total_faltas > 10) {
                situacao = 'Reprovado por falta';
            } else {
                situacao = 'Reprovado';
            }
                }
        return {
            materia,
            media,                  
            total_faltas,                                               
            situacao
        };
    }); 
    return res.status(200).json({ situacao_por_materia });
}


 
// ```javascript
// // HTTP 200
// {
//     "situacao_por_materia": [
//         {
//             "materia": "Matemática",
//             "media": 8.5,
//             "total_faltas": 2,
//             "situacao": "Aprovado"
//         },
//         {
//             "materia": "Português",
//             "media": 5.0,
//             "total_faltas": 3,
//             "situacao": "Reprovado"
//         },
//         {
//             "materia": "História",
//             "media": 7.0,
//             "total_faltas": 11,
//             "situacao": "Reprovado por falta"
//         },
//         {
//             "materia": "Geografia",
//             "media": null,
//             "total_faltas": 0,
//             "situacao": "Sem registros"
//         }
//     ]
// }
// ```

// > Matérias sem nenhuma nota registrada devem aparecer com `media: null` e `situacao: "Sem registros"`.

// **Resposta (erro):**

// ```javascript
// // HTTP 401
// {
//     "mensagem": "Senha inválida!"
// }
// ```

// ---

 
 module.exports = {
    inserNotas,
    registrarFaltas,
    transferirAluno,
    consultarSituacaoPorMateria

}
