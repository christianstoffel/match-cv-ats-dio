# Testes e Validação — MatchCV ATS

## 1. Objetivo

Validar o funcionamento do MatchCV ATS por meio de cenários fictícios, verificando a análise de compatibilidade entre currículo e vaga, a identificação de requisitos, a geração de recomendações e a otimização do currículo.

Os dados utilizados são inteiramente fictícios e não representam candidatos ou empresas reais.

## 2. Vaga utilizada

**Cargo:** Desenvolvedor(a) Full Stack .NET Pleno  
**Empresa fictícia:** TechNova Solutions  
**Localização:** Porto Alegre/RS

A vaga exige conhecimentos em C#, .NET, ASP.NET Core, APIs REST, SQL Server, Entity Framework Core, React, TypeScript, Git, Scrum e testes unitários.

Também apresenta requisitos desejáveis, incluindo Docker, Azure DevOps, CI/CD, microsserviços, mensageria, SOLID e Microsoft Azure.

## 3. Cenário A — Candidato com alta compatibilidade

**Candidato fictício:** Rafael Martins Oliveira

### Perfil

Desenvolvedor com experiência profissional em C#, .NET 6/8, ASP.NET Core, SQL Server, Entity Framework Core, React e TypeScript.

Também possui experiência com Git, Scrum, testes unitários utilizando xUnit e conhecimentos básicos de Docker.

### Resultado esperado

- Identificação da maioria dos requisitos obrigatórios.
- Pontuação de compatibilidade relativamente elevada.
- Reconhecimento de competências técnicas comprovadas.
- Identificação de requisitos desejáveis não comprovados.
- Geração de currículo otimizado preservando experiências, empresas e tecnologias originais.

## 4. Cenário B — Candidato com baixa compatibilidade

**Candidata fictícia:** Mariana Costa Ferreira

### Perfil

Desenvolvedora web com experiência em PHP, Laravel, JavaScript, HTML, CSS, MySQL e Git.

Possui experiência com integrações por APIs REST e conhecimentos básicos de Python, mas não apresenta experiência declarada nas principais tecnologias .NET exigidas pela vaga.

### Resultado esperado

- Pontuação inferior à do candidato Rafael.
- Reconhecimento de competências compartilhadas, como Git e APIs REST.
- Identificação da ausência de evidências para C#, .NET, ASP.NET Core, Entity Framework Core, React e TypeScript.
- Geração de recomendações de melhoria.
- Preservação das experiências originais, sem atribuir competências inexistentes.

## 5. Critérios de validação

| Critério | Comportamento esperado |
|---|---|
| Inserção de dados | Aceitar descrição da vaga e currículo em texto |
| Análise | Processar as informações e retornar resultados |
| Compatibilidade | Diferenciar perfis conforme os requisitos comprovados |
| Palavras-chave | Identificar competências presentes e não comprovadas |
| Recomendações | Apresentar melhorias relacionadas à vaga |
| Otimização | Reorganizar o currículo sem inventar informações |
| Edição | Permitir alterações manuais no currículo gerado |
| Exportação | Disponibilizar o currículo em PDF |

## 6. Resultado geral

Os testes realizados com os cenários fictícios apresentaram funcionamento satisfatório, conforme validação manual da aplicação.

Os dois perfis foram escolhidos para avaliar a capacidade da ferramenta de distinguir experiências diretamente relacionadas à vaga de conhecimentos técnicos parcialmente transferíveis.

A ferramenta permanece sujeita às limitações inerentes à análise por inteligência artificial. Por isso, os resultados devem ser interpretados como estimativas, e não como avaliações oficiais de sistemas ATS.

## 7. Evidências visuais

As capturas de tela dos testes estão disponíveis no diretório [`screenshots/`](screenshots/), com exemplos da interface, dos resultados da análise e do currículo otimizado.

## 8. Observações

Os testes documentados são funcionais e exploratórios. Não constituem uma validação estatística do modelo de inteligência artificial nem comprovam compatibilidade com todas as plataformas ATS existentes.
