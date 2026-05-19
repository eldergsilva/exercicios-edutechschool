const { escola, materias, alunos } = require('../bancodedados/bancodedados');
const listarAlunos = (req, res) => {
    const {senha_escola}= req.query;
    if(!senha_escola){
    return res.status(400).json({mensagem:'A senha é obrigatória!'});
    }
    if(senha_escola !== escola.senha){
    return res.status(400).json({mensagem:'A senha da escola informada é inválida!'});
    }
     
    return res.status(201).json(alunos);
  }
  
 const criarAluno = (req,res)=>{
    return res.status(201).json('Criar alunos rodando!.')
 }  



module.exports = {
    listarAlunos,
    criarAluno
}