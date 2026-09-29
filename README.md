# Testes Unitários com Jest — Aula 02

## Identificação

- **Alunos:** Gustavo e Gabriel
- **Turma:** Full Stack

## Como rodar

Dentro de cada pasta (`calculadora` e `boletim-escolar`):

```bash
npm install
npm test
```

---

## Parte A — Calculadora

### Exercício 1 — As quatro operações

| Caso | Função | Entrada | Esperado | Obtido |
|---|---|---|---|---|
| CT-01 | subtrair | 10, 4 | 6 | 6 |
| CT-02 | multiplicar | 3, 4 | 12 | 12 |
| CT-03 | dividir | 10, 2 | 5 | 5 |

### Exercício 2 — Casos de borda

**Item 3 — números decimais.** O teste `expect(somar(0.1, 0.2)).toBe(0.3)` falhou e o Jest mostrou:

```
Expected: 0.3
Received: 0.30000000000000004
```

**Pergunta: o defeito está na nossa função ou na forma como o computador guarda números decimais?**

**Resposta:** Está na forma como o computador guarda os números decimais. A função `somar` está correta: ela apenas faz `a + b`. O JavaScript guarda os números em binário (padrão IEEE 754), e valores como 0.1 e 0.2 não têm representação exata em binário, assim como 1/3 não tem representação exata em decimal (0,333...). Por isso a soma sai com uma pequena sobra (`0.30000000000000004`). Para corrigir o **teste**, arredondamos o resultado antes de comparar: `Math.round(resultado * 100) / 100`.

### Exercício 3 — Verdadeiro ou falso

`ehPar(4)` retorna `true` e `ehPar(7)` retorna `false`, ambos testados com `toBe`.

### Exercício 4 — Novos cálculos

| Caso | Função | Entrada | Esperado | Obtido |
|---|---|---|---|---|
| CT-04 | potencia | 2, 3 | 8 | 8 |
| CT-05 | porcentagem | 200, 10 | 20 | 20 |
| CT-06 | mediaDeTres | 6, 7, 8 | 7 | 7 |

---

## Parte B — Boletim Escolar

### Exercício 7 — Plano de testes

| Caso | Função | Entrada | Esperado | Obtido |
|---|---|---|---|---|
| CT-01 | calcularMedia | [5, 6] | 5.5 | 5.5 |
| CT-02 | situacao | 7 (exatamente no limite) | "Aprovado" | "Aprovado" |
| CT-03 | situacao | 4.9 | "Reprovado" | "Reprovado" |
| CT-04 | estaAprovado | 6 | false | false |
| CT-05 | quantidadeAcimaDe | [4, 7, 8.5, 6.9], 7 | 2 | 2 |
| CT-06 | maiorNota | [3, 10, 5] | 10 | 10 |
| CT-07 | estaAprovado | 7 (média que aprova) | true | true |

### Exercício 8 — Teste que falhou de propósito

No CT-01 trocamos o valor esperado de `5.5` para `6`. O Jest mostrou `Expected: 6` e `Received: 5.5`, indicando que a função estava certa e o erro estava no valor esperado do teste. Voltamos para `5.5` e o teste passou.

---

## Parte C — Frequência

### Exercício 9 — Casos de teste

| Caso | Função | Entrada (aulas, faltas) | Esperado | Obtido |
|---|---|---|---|---|
| CT-01 | percentualPresenca | 40, 4 | 90 | 90 |
| CT-02 | percentualPresenca | 40, 0 | 100 | 100 |
| CT-03 | reprovadoPorFalta | 40, 4 | false | false |
| CT-04 | reprovadoPorFalta | 40, 12 | true | true |
| CT-05 | reprovadoPorFalta | 40, 10 (presença de 75%) | false | **true** (falhou antes da correção) |

### Exercício 10 — Relato de bug

| Campo | Sua resposta |
|---|---|
| Caso que falhou | CT-05 — `reprovadoPorFalta(40, 10)` |
| Passos para reproduzir | 1. Abrir `boletim-escolar`. 2. Rodar `npm test`. 3. Ver o teste "deve aprovar por frequência com exatamente 75% de presença" falhar. Ou, no código, chamar `reprovadoPorFalta(40, 10)`. |
| Resultado esperado | `false` (com exatamente 75% de presença o aluno não é reprovado) |
| Resultado obtido (Received) | `true` |
| Erro (o engano humano) | Quem escreveu a função usou o operador `<=` em vez de `<`, esquecendo que a regra diz "abaixo de 75%", ou seja, 75% não reprova. |
| Defeito (onde está no código) | `src/frequencia.js`, linha 8: `return presenca <= 75;` |
| Falha (o que o usuário perceberia) | Um aluno com exatamente 75% de presença apareceria como reprovado por falta, quando deveria ser aprovado. |
| Correção proposta | Trocar `<=` por `<`: `return presenca < 75;` |

Depois da correção, os 5 casos da frequência passam.

---

## Resultado final

### Projeto `calculadora`

```
PASS src/calculadora.test.js
  Operações matemáticas
    ✓ deve somar dois números (3 ms)
    ✓ deve subtrair dois números
    ✓ deve multiplicar dois números
    ✓ deve dividir dois números (1 ms)
    ✓ deve somar números negativos (1 ms)
    ✓ deve retornar null ao dividir por zero
    ✓ deve somar números decimais (1 ms)
    ✓ deve reconhecer 4 como par (1 ms)
    ✓ deve reconhecer 7 como ímpar (1 ms)
    ✓ deve elevar a base ao expoente (2 ms)
    ✓ deve calcular o percentual de um valor (2 ms)
    ✓ deve calcular a média de três números (1 ms)

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        0.651 s, estimated 1 s
Ran all test suites.
```

### Projeto `boletim-escolar`

```
PASS src/frequencia.test.js
  Frequência
    ✓ deve calcular 90% de presença com 4 faltas em 40 aulas (4 ms)
    ✓ deve calcular 100% de presença sem faltas (1 ms)
    ✓ deve aprovar por frequência com 4 faltas em 40 aulas
    ✓ deve reprovar por falta com 12 faltas em 40 aulas (1 ms)
    ✓ deve aprovar por frequência com exatamente 75% de presença

PASS src/boletim.test.js
  Boletim Escolar
    ✓ deve calcular a média de [5, 6] como 5.5 (2 ms)
    ✓ deve retornar Aprovado para média 7 (limite)
    ✓ deve retornar Reprovado para média 4.9 (2 ms)
    ✓ deve retornar false para média 6 (1 ms)
    ✓ deve contar 2 notas maiores ou iguais a 7 em [4, 7, 8.5, 6.9]
    ✓ deve retornar 10 como maior nota de [3, 10, 5] (1 ms)
    ✓ deve retornar true para média 7 (3 ms)

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        0.581 s, estimated 1 s
Ran all test suites.
```
