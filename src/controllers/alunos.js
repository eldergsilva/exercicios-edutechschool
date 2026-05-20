const { escola, materias, alunos } = require('../bancodedados/bancodedados');
const listarAlunos = (req, res) => {
    const {senha_escola}= req.query;
    if(!senha_escola){
    return res.status(400).json({mensagem:'A senha é obrigatória!'});
    }
    if(senha_escola !== escola.senha){
    return res.status(400).json({mgitensagem:'A senha da escola informada é inválida!'});
    }
     
    return res.status(201).json(alunos);
  }
  
 const criarAluno = (req,res)=>{
     

    const {nome,cpf,data_nascimento,telefone,email,senha,turma}=req.body;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha || !turma){
        return res.status(400).json({mensagem:'Todos os campos são obrigatórios!'});
    }
    
    const buscaCpfAluno = alunos.find((aluno) => aluno.cpf === cpf);
    if(buscaCpfAluno){
        return res.status(400).json({mensagem:'O CPF informado já está cadastrado!'});
    }
    const buscaEmailAluno = alunos.find((aluno) => aluno.email === email);
    if(buscaEmailAluno){
        return res.status(400).json({mensagem:'O E-mail informado já está cadastrado!'});
    }
    
    const novoAluno = {
        id: alunos.length + 1,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        turma
    };
    alunos.push(novoAluno);

    return res.status(201).json({mensagem:'Aluno criado com sucesso!'});
};

const atualizarAluno = (req, res) => {
    const { matricula } = req.params;

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const aluno = alunos.find((a) => String(a.id) === String(matricula));
    if (!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' });
    }

    const cpfJaCadastrado = alunos.some((a) => a.cpf === cpf && String(a.id) !== String(matricula));
    if (cpfJaCadastrado) {
        return res.status(400).json({ mensagem: 'O CPF informado já pertence a outro aluno!' });
    }

    const emailJaCadastrado = alunos.some((a) => a.email === email && String(a.id) !== String(matricula));
    if (emailJaCadastrado) {
        return res.status(400).json({ mensagem: 'O E-mail informado já pertence a outro aluno!' });
    }
        
    aluno.nome = nome;
    aluno.cpf = cpf;
    aluno.data_nascimento = data_nascimento;
    aluno.telefone = telefone;
    aluno.email = email;
    aluno.senha = senha;
    
    return res.status(204).send();
};

module.exports = {
    listarAlunos,
    criarAluno,
    atualizarAluno
}