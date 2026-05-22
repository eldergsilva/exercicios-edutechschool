 const {buscarAlunoPorMatricula,buscarMateriaValida} = require('../utils/calculos');
 const { alunos, notas, escola } = require('../bancodedados');

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
module.exports = {
    inserNotas
}
