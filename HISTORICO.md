# Histórico de Desenvolvimento — MatchCV ATS

## 1. Planejamento

O projeto MatchCV ATS foi desenvolvido como parte do Bootcamp DIO — Vibe Coding, utilizando o Lovable para construir uma aplicação web de análise e otimização de currículos.

O desafio consistia em desenvolver uma ferramenta capaz de comparar um currículo com uma descrição de vaga, apresentar uma estimativa de compatibilidade e gerar uma versão do currículo mais adequada à leitura por sistemas ATS.

A estratégia adotada foi elaborar um megaprompt detalhado antes de iniciar a implementação, buscando reduzir a necessidade de interações adicionais com o Lovable e otimizar o consumo de créditos da conta gratuita.

## 2. Definição do escopo

Foram priorizadas as funcionalidades essenciais:

- Inserção da descrição da vaga e do currículo por texto.
- Análise de compatibilidade utilizando inteligência artificial.
- Identificação de competências e requisitos comprovados ou ausentes.
- Geração de recomendações de melhoria.
- Criação de uma versão otimizada do currículo.
- Edição manual do conteúdo gerado.
- Exportação do currículo em PDF.

A primeira versão foi planejada sem autenticação, banco de dados ou histórico de análises, evitando complexidade desnecessária.

## 3. Elaboração do megaprompt

O megaprompt foi preparado em Markdown, especificando:

- Objetivos e regras de negócio.
- Tecnologias e arquitetura.
- Design system shadcn/ui e identidade visual.
- Estrutura da interface.
- Processamento com inteligência artificial.
- Cálculo indicativo de compatibilidade.
- Regras para impedir a criação de informações fictícias.
- Edição e exportação em PDF.
- Estados de carregamento, sucesso e erro.
- Critérios de aceitação.

A especificação completa está disponível em [MEGAPROMPT.md](MEGAPROMPT.md).

## 4. Implementação no Lovable

A aplicação foi gerada utilizando o Lovable, com foco no desenvolvimento do fluxo principal em uma primeira implementação.

Uma decisão importante foi concentrar a análise da vaga e a geração do currículo otimizado em uma única operação de inteligência artificial, buscando evitar chamadas desnecessárias.

Também foi priorizada uma interface acessível sem cadastro, permitindo que o usuário utilize a ferramenta imediatamente.

## 5. Testes e validação

Após a geração da aplicação, foram preparados três conjuntos de dados fictícios:

- Uma vaga de Desenvolvedor(a) Full Stack .NET Pleno.
- Um currículo com experiência diretamente relacionada à vaga.
- Um currículo com experiência em desenvolvimento web, mas utilizando tecnologias diferentes.

O objetivo foi verificar se a aplicação conseguiria reconhecer diferentes níveis de compatibilidade e preservar as informações verdadeiras de cada candidato durante a otimização.

A aplicação apresentou funcionamento satisfatório nos testes realizados.

Os cenários estão documentados em [TESTES.md](TESTES.md).

## 6. Ajustes e decisões

Durante o planejamento, foram tomadas decisões para manter o MVP simples e funcional:

| Decisão | Justificativa |
|---|---|
| Não implementar login | Eliminar etapas desnecessárias para o usuário |
| Não implementar banco de dados | Evitar complexidade e armazenamento de informações pessoais |
| Utilizar IA para análise semântica | Permitir identificação de competências além da correspondência literal |
| Permitir edição manual | Garantir controle do usuário sobre o currículo final |
| Exportar em PDF | Disponibilizar um documento pronto para utilização |
| Priorizar uma chamada de IA por análise | Reduzir processamento e consumo de créditos |

Não foram identificadas, nos testes relatados, falhas que exigissem alterações substanciais no fluxo principal após a geração inicial.

As alterações posteriores de documentação e organização do repositório foram realizadas para atender aos requisitos de entrega do desafio.

## 7. Publicação

A aplicação foi publicada no Lovable e disponibilizada para acesso público.

**Aplicação:** https://match-cv-ats-dio.lovable.app

**Repositório:** https://github.com/christianstoffel/match-cv-ats-dio

## 8. Considerações finais

O desenvolvimento demonstrou como um megaprompt bem estruturado pode orientar a construção de um MVP funcional, com menor necessidade de refinamentos posteriores.

O projeto também reforçou a importância de validar resultados produzidos por inteligência artificial, especialmente em aplicações que trabalham com informações profissionais e decisões relacionadas ao recrutamento.
