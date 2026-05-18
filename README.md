# 🏫 Desafio — API REST: Sistema Escolar

## Descrição do Desafio

Você foi contratado pela **EduTech**, uma empresa de tecnologia educacional. Sua missão é construir uma API RESTful para um sistema de gerenciamento escolar. O projeto é um **piloto**, portanto dados da escola (nome, código, etc.) serão imutáveis por enquanto.

Sua API deverá permitir:

- Cadastrar aluno
- Listar alunos
- Atualizar dados de um aluno
- Excluir um aluno
- Registrar nota de um aluno em uma matéria
- Registrar falta de um aluno em uma matéria
- Transferir aluno de turma
- Consultar situação por matéria
- Consultar se o aluno passou de ano
- Emitir boletim completo

---

## Regras de Negócio Importantes

> Leia com atenção antes de começar a implementar.

**Matérias disponíveis:** `Matemática`, `Português`, `História`, `Geografia`, `Ciências`, `Inglês`, `Educação Física`, `Artes`

**Aprovação por matéria:**
- Média final da matéria >= `6.0` → **Aprovado**
- Média final da matéria < `6.0` → **Reprovado**
- Mais de `25%` de faltas na matéria → **Reprovado por falta** (independente da nota)

> Cada matéria tem `40 aulas` no ano. Logo, o limite de faltas por matéria é `10 faltas`.

**Aprovação de ano:**
- Aprovado em **todas** as matérias → `"Aprovado"`
- Reprovado em `1 ou 2` matérias → `"Recuperação"`
- Reprovado em `3 ou mais` matérias → `"Reprovado"`

---

## Persistência dos Dados

Os dados serão persistidos **em memória**, no objeto dentro do arquivo `bancodedados.js`:

```javascript
{
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
        // array de alunos
    ],
    notas: [
        // array de registros de notas
    ],
    faltas: [
        // array de registros de faltas
    ],
    transferencias: [
        // array de transferências entre turmas
    ],
}
```

---

## Requisitos Obrigatórios

- Sua API deve seguir o padrão REST
- Organize bem o código, separando responsabilidades:
  - `index.js` — ponto de entrada
  - arquivo de rotas
  - pasta `controllers/` com os controladores
  - pasta `utils/` com funções auxiliares (cálculo de média, verificação de aprovação, etc.)
- Valores de notas devem ser números decimais entre `0` e `10`
- Evite duplicação de código — centralize lógicas repetidas em funções auxiliares
- Sempre que uma validação falhar, responda com o status HTTP adequado e mensagem clara

**Exemplo de erro:**

```javascript
// HTTP Status 404
{
    "mensagem": "Aluno não encontrado!"
}
```

---

## Status Codes Esperados

```
200 (OK)                    → requisição bem sucedida
201 (Created)               → recurso criado com sucesso
204 (No Content)            → sucesso sem conteúdo de retorno
400 (Bad Request)           → dados inválidos ou ausentes
401 (Unauthorized)          → não autenticado
403 (Forbidden)             → sem permissão
404 (Not Found)             → recurso não encontrado
500 (Internal Server Error) → erro no servidor
```

---

## Endpoints

---

### 📋 Listar Alunos

#### `GET` `/alunos?senha_escola=EduTech2024`

Lista todos os alunos cadastrados. Requer autenticação via query param.

**Validações obrigatórias:**
- Verificar se `senha_escola` foi informada
- Validar se a senha está correta

**Exemplo de resposta (sucesso):**

```javascript
// HTTP 200
[
    {
        "matricula": "1",
        "turma": "9A",
        "usuario": {
            "nome": "Ana Paula",
            "cpf": "11122233344",
            "data_nascimento": "2010-05-20",
            "telefone": "71988887777",
            "email": "ana@email.com",
            "senha": "1234"
        }
    }
]
```

**Exemplo de resposta (erro):**

```javascript
// HTTP 403
{
    "mensagem": "A senha da escola informada é inválida!"
}
```

---

### ➕ Cadastrar Aluno

#### `POST` `/alunos`

Cria um novo aluno com matrícula gerada automaticamente.

**Validações obrigatórias:**
- Todos os campos são obrigatórios
- CPF deve ser único
- E-mail deve ser único
- Turma deve ser informada

**Requisição — body:**

```javascript
{
    "nome": "Maria Fernanda",
    "cpf": "99988877766",
    "data_nascimento": "2010-03-10",
    "telefone": "71966665555",
    "email": "maria@email.com",
    "senha": "senha123",
    "turma": "7C"
}
```

**Resposta (sucesso):** sem corpo (`201`)

**Resposta (erro):**

```javascript
// HTTP 400
{
    "mensagem": "Já existe um aluno com o CPF ou e-mail informado!"
}
```

---

### ✏️ Atualizar Dados do Aluno

#### `PUT` `/alunos/:matricula/usuario`

Atualiza os dados pessoais de um aluno existente.

**Validações obrigatórias:**
- Todos os campos são obrigatórios
- Verificar se a matrícula existe
- Se CPF for alterado, verificar unicidade
- Se e-mail for alterado, verificar unicidade

**Requisição — body:**

```javascript
{
    "nome": "Maria Fernanda Lima",
    "cpf": "99988877766",
    "data_nascimento": "2010-03-10",
    "telefone": "71966665555",
    "email": "marianova@email.com",
    "senha": "novasenha"
}
```

**Resposta (sucesso):** sem corpo (`204`)

**Resposta (erro):**

```javascript
// HTTP 400
{
    "mensagem": "O CPF informado já pertence a outro aluno!"
}
```

---

### 🗑️ Excluir Aluno

#### `DELETE` `/alunos/:matricula`

Remove um aluno do sistema.

**Validações obrigatórias:**
- Verificar se a matrícula existe
- Só permitir exclusão se o aluno **não possuir notas ou faltas registradas**

**Resposta (sucesso):** sem corpo (`204`)

**Resposta (erro):**

```javascript
// HTTP 400
{
    "mensagem": "O aluno possui registros acadêmicos e não pode ser excluído!"
}
```

---

### 📝 Registrar Nota

#### `POST` `/academico/notas`

Registra uma nota para um aluno em uma matéria.

**Validações obrigatórias:**
- `matricula`, `materia` e `valor` são obrigatórios
- Verificar se o aluno existe
- Verificar se a matéria informada é uma das matérias válidas da escola
- Nota deve ser entre `0` e `10`

**Requisição — body:**

```javascript
{
    "matricula": "1",
    "materia": "Matemática",
    "valor": 8.5
}
```

**Resposta (sucesso):** sem corpo (`201`)

**Resposta (erro):**

```javascript
// HTTP 400
{
    "mensagem": "Matéria inválida! Consulte as matérias disponíveis."
}
```

**Exemplo de registro salvo:**

```javascript
{
    "data": "2024-06-10 14:30:00",
    "matricula": "1",
    "materia": "Matemática",
    "valor": 8.5
}
```

---

### 🚫 Registrar Falta

#### `POST` `/academico/faltas`

Registra uma falta para um aluno em uma matéria.

**Validações obrigatórias:**
- `matricula` e `materia` são obrigatórios
- Verificar se o aluno existe
- Verificar se a matéria é válida

**Requisição — body:**

```javascript
{
    "matricula": "1",
    "materia": "História"
}
```

**Resposta (sucesso):** sem corpo (`201`)

**Resposta (erro):**

```javascript
// HTTP 404
{
    "mensagem": "Aluno não encontrado!"
}
```

**Exemplo de registro salvo:**

```javascript
{
    "data": "2024-06-10 08:00:00",
    "matricula": "1",
    "materia": "História"
}
```

---

### 🔄 Transferir Aluno de Turma

#### `POST` `/academico/transferir`

Transfere um aluno de uma turma para outra.

**Validações obrigatórias:**
- `matricula`, `turma_origem`, `turma_destino` e `senha` são obrigatórios
- Verificar se o aluno existe
- Verificar se a senha é válida para o aluno
- Verificar se `turma_origem` corresponde à turma atual do aluno
- `turma_origem` e `turma_destino` não podem ser iguais

**Requisição — body:**

```javascript
{
    "matricula": "1",
    "turma_origem": "9A",
    "turma_destino": "9B",
    "senha": "1234"
}
```

**Resposta (sucesso):** sem corpo (`204`)

**Resposta (erro):**

```javascript
// HTTP 400
{
    "mensagem": "A turma de origem não corresponde à turma atual do aluno!"
}
```

**Exemplo de registro salvo:**

```javascript
{
    "data": "2024-06-10 10:15:00",
    "matricula": "1",
    "turma_origem": "9A",
    "turma_destino": "9B"
}
```

---

### 📊 Consultar Situação por Matéria

#### `GET` `/alunos/situacao?matricula=1&senha=1234`

Retorna a situação do aluno em **cada matéria individualmente**: média, total de faltas e se foi aprovado.

**Validações obrigatórias:**
- `matricula` e `senha` são obrigatórios (query params)
- Verificar se o aluno existe
- Verificar se a senha é válida

**Resposta (sucesso):**

```javascript
// HTTP 200
{
    "situacao_por_materia": [
        {
            "materia": "Matemática",
            "media": 8.5,
            "total_faltas": 2,
            "situacao": "Aprovado"
        },
        {
            "materia": "Português",
            "media": 5.0,
            "total_faltas": 3,
            "situacao": "Reprovado"
        },
        {
            "materia": "História",
            "media": 7.0,
            "total_faltas": 11,
            "situacao": "Reprovado por falta"
        },
        {
            "materia": "Geografia",
            "media": null,
            "total_faltas": 0,
            "situacao": "Sem registros"
        }
    ]
}
```

> Matérias sem nenhuma nota registrada devem aparecer com `media: null` e `situacao: "Sem registros"`.

**Resposta (erro):**

```javascript
// HTTP 401
{
    "mensagem": "Senha inválida!"
}
```

---

### 🎓 Consultar Aprovação de Ano

#### `GET` `/alunos/aprovacao?matricula=1&senha=1234`

Informa se o aluno foi **aprovado**, ficou em **recuperação** ou foi **reprovado** no ano letivo, com base na situação consolidada de todas as matérias.

**Validações obrigatórias:**
- `matricula` e `senha` são obrigatórios (query params)
- Verificar se o aluno existe
- Verificar se a senha é válida

**Regras:**
- Aprovado em todas → `"Aprovado"`
- Reprovado em 1 ou 2 matérias → `"Recuperação"`
- Reprovado em 3 ou mais → `"Reprovado"`

**Resposta (sucesso):**

```javascript
// HTTP 200
{
    "resultado": "Recuperação",
    "materias_reprovadas": ["Português", "História"],
    "materias_aprovadas": ["Matemática", "Geografia", "Ciências", "Inglês", "Educação Física", "Artes"]
}
```

**Resposta (erro):**

```javascript
// HTTP 404
{
    "mensagem": "Aluno não encontrado!"
}
```

---

### 📄 Emitir Boletim Completo

#### `GET` `/alunos/boletim?matricula=1&senha=1234`

Retorna o boletim completo: todas as notas, faltas por matéria e histórico de transferências.

**Validações obrigatórias:**
- `matricula` e `senha` são obrigatórios (query params)
- Verificar se o aluno existe
- Verificar se a senha é válida

**Resposta (sucesso):**

```javascript
// HTTP 200
{
    "notas": [
        {
            "data": "2024-06-10 14:30:00",
            "matricula": "1",
            "materia": "Matemática",
            "valor": 8.5
        },
        {
            "data": "2024-06-11 09:00:00",
            "matricula": "1",
            "materia": "Português",
            "valor": 5.0
        }
    ],
    "faltas": [
        {
            "data": "2024-06-10 08:00:00",
            "matricula": "1",
            "materia": "História"
        }
    ],
    "transferencias": [
        {
            "data": "2024-06-10 10:15:00",
            "matricula": "1",
            "turma_origem": "9A",
            "turma_destino": "9B"
        }
    ]
}
```

**Resposta (erro):**

```javascript
// HTTP 404
{
    "mensagem": "Aluno não encontrado!"
}
```

---

## 💡 Dicas para o Desenvolvimento

- Comece pela estrutura de arquivos antes de codificar
- Implemente e teste **um endpoint por vez**
- Crie uma função auxiliar `buscarAlunoPorMatricula()` — você vai usá-la em quase todo endpoint
- Crie uma função auxiliar `calcularSituacaoPorMateria(matricula)` — ela é reutilizada em `/situacao`, `/aprovacao` e no boletim
- Para calcular a média, some todas as notas da matéria e divida pela quantidade
- Para calcular faltas, basta contar quantos registros existem no array `faltas` para aquela matéria e matrícula
- Use `new Date().toLocaleString('pt-BR')` para gerar os timestamps dos registros

---

## Estrutura de Arquivos Sugerida

```
src/
├── index.js
├── rotas.js
├── bancodedados.js
├── controllers/
│   ├── alunosController.js
│   └── academicoController.js
└── utils/
    └── calculos.js        ← média, situação por matéria, aprovação de ano
```

---

###### tags: `back-end` `node.js` `API REST` `express` `desafio` `escola`
