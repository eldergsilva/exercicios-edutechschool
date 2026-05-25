const bancodedados = {
    escola: {
        nome: "EduTech School",
        codigo: "EDU001",
        turno: "Integral",
        senha: "EduTech2024",
    },
    materias: [
        "Matemática",
        "Português",
        "História",
        "Geografia",
        "Ciências",
        "Inglês",
        "Educação Física",
        "Artes"
    ],
    alunos: [
        {
            matricula: 1,
            turma: "9A",
            usuario: {
                nome: "Elder",
                cpf: "11122233344",
                data_nascimento: "2000-01-15",
                telefone: "71988887777",
                email: "elder@email.com",
                senha: "1234"
            }
        },
        {
            matricula: 2,
            turma: "8B",
            usuario: {
                nome: "Gemini",
                cpf: "22233344455",
                data_nascimento: "2001-05-20",
                telefone: "71977776666",
                email: "gemini@email.com",
                senha: "1234"
            }
        },
        {
            matricula: 3,
            turma: "7C",
            usuario: {
                nome: "Claude",
                cpf: "33344455566",
                data_nascimento: "2002-09-10",
                telefone: "71966665555",
                email: "claude@email.com",
                senha: "1234"
            }
        }
    ],
    notas: [
        // Elder — vai passar
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Matemática", valor: 8.5 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Português", valor: 7.0 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "História", valor: 6.5 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Geografia", valor: 9.0 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Ciências", valor: 7.5 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Inglês", valor: 8.0 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Educação Física", valor: 9.5 },
        { data: "2024-06-10 08:00:00", matricula: "1", materia: "Artes", valor: 7.0 },

        // Gemini — vai ficar em recuperação (reprovado em 2)
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Matemática", valor: 4.0 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Português", valor: 3.5 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "História", valor: 7.0 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Geografia", valor: 8.0 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Ciências", valor: 6.5 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Inglês", valor: 7.0 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Educação Física", valor: 8.5 },
        { data: "2024-06-10 08:00:00", matricula: "2", materia: "Artes", valor: 6.0 },

        // Claude — vai ser reprovado (reprovado em 3+)
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Matemática", valor: 3.0 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Português", valor: 2.5 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "História", valor: 4.0 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Geografia", valor: 8.0 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Ciências", valor: 7.5 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Inglês", valor: 6.0 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Educação Física", valor: 9.0 },
        { data: "2024-06-10 08:00:00", matricula: "3", materia: "Artes", valor: 5.0 },
    ],
    faltas: [
        // Elder — poucas faltas, sem problema
        { data: "2024-06-11 08:00:00", matricula: "1", materia: "Matemática" },
        { data: "2024-06-12 08:00:00", matricula: "1", materia: "Português" },

        // Gemini — faltas normais
        { data: "2024-06-11 08:00:00", matricula: "2", materia: "Matemática" },
        { data: "2024-06-12 08:00:00", matricula: "2", materia: "Matemática" },
        { data: "2024-06-13 08:00:00", matricula: "2", materia: "Português" },

        // Claude — reprovado por falta em História (11 faltas)
        { data: "2024-06-11 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-12 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-13 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-14 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-15 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-16 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-17 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-18 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-19 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-20 08:00:00", matricula: "3", materia: "História" },
        { data: "2024-06-21 08:00:00", matricula: "3", materia: "História" },
    ],
    transferencias: [
        // Gemini transferido de 8B para 8A
        { data: "2024-05-10 10:00:00", matricula: "2", turma_origem: "8B", turma_destino: "8A" },
    ],
}

module.exports = bancodedados;