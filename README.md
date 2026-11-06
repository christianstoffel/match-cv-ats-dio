# MatchCV ATS

Aplicação web desenvolvida com o **Lovable**, utilizando inteligência artificial para analisar a compatibilidade entre currículos e vagas de emprego, identificar oportunidades de melhoria e gerar versões de currículos mais adequadas à leitura por sistemas ATS (*Applicant Tracking Systems*).

Projeto desenvolvido como parte de um desafio prático do **Bootcamp DIO — Vibe Coding**.

## Aplicação publicada

**[Acessar MatchCV ATS](https://match-cv-ats-dio.lovable.app)**

## O problema

Muitos candidatos possuem experiências e qualificações relevantes para determinadas vagas, mas seus currículos nem sempre apresentam essas informações de maneira clara, organizada ou alinhada aos requisitos anunciados.

Sistemas ATS podem utilizar critérios de estruturação e correspondência de informações para auxiliar processos de recrutamento.

O MatchCV ATS busca facilitar a identificação dessas oportunidades de melhoria, sem prometer aprovação em processos seletivos.

## Funcionalidades

- Comparação entre descrição da vaga e currículo.
- Análise de compatibilidade com inteligência artificial.
- Pontuação estimada de compatibilidade.
- Identificação de competências e palavras-chave presentes ou não comprovadas.
- Recomendações para melhorar a apresentação profissional.
- Geração de uma versão otimizada do currículo.
- Edição manual do currículo gerado.
- Cópia do conteúdo e exportação em PDF.
- Interface responsiva, sem necessidade de cadastro ou login.

**Princípio fundamental:** a aplicação não deve inventar experiências, competências, certificações ou outras qualificações. A otimização deve preservar as informações reais fornecidas pelo usuário.

## Como funciona

1. **Informar a vaga:** o usuário cola a descrição da oportunidade desejada.
2. **Informar o currículo:** o usuário cola suas experiências, formação e competências.
3. **Analisar:** a aplicação utiliza inteligência artificial para identificar requisitos da vaga e evidências correspondentes no currículo.
4. **Visualizar os resultados:** são apresentados a compatibilidade estimada, os requisitos identificados e as recomendações de melhoria.
5. **Otimizar:** a aplicação gera uma versão reorganizada do currículo, alinhada à vaga e limitada às informações fornecidas.
6. **Editar e exportar:** o usuário revisa o texto, realiza ajustes e exporta a versão final em PDF.

A pontuação representa uma estimativa de compatibilidade, não uma avaliação oficial de sistemas ATS ou garantia de contratação.

## Tecnologias

- Lovable — desenvolvimento assistido por inteligência artificial.
- React e TypeScript — interface e lógica da aplicação.
- Tailwind CSS — estilização.
- shadcn/ui — componentes de interface.
- Lovable AI — processamento e análise dos textos.

## Desenvolvimento com Vibe Coding

O projeto foi construído a partir de um **megaprompt em Markdown**, descrevendo o objetivo, as funcionalidades, a interface, a arquitetura e os critérios de aceitação.

A implementação priorizou o funcionamento completo do MVP, evitando recursos desnecessários nesta primeira versão, como autenticação, banco de dados e histórico de análises.

A proposta foi concentrar o desenvolvimento no fluxo principal: análise da vaga, comparação com o currículo, otimização do conteúdo e exportação em PDF.

### Documentação do processo

- [Megaprompt utilizado](MEGAPROMPT.md)
- [Histórico de desenvolvimento e ajustes](HISTORICO.md)
- [Cenários de teste e validação](TESTES.md)

## Testes

A aplicação foi testada com uma vaga fictícia para Desenvolvedor(a) Full Stack .NET Pleno e dois currículos fictícios com perfis distintos.

O primeiro candidato apresentava experiência diretamente relacionada aos requisitos da vaga. O segundo possuía experiência em desenvolvimento web, porém com tecnologias diferentes das principais exigidas.

Os testes permitiram avaliar a identificação de competências, a diferenciação de compatibilidade entre candidatos e a preservação das informações originais nos currículos otimizados.

Os cenários utilizados estão documentados em [TESTES.md](TESTES.md).

## Capturas de tela

As capturas de tela da aplicação serão adicionadas nesta seção, demonstrando o formulário, os resultados da análise e o currículo otimizado.

## Limitações e evolução futura

O MatchCV ATS é um MVP educacional. As análises podem apresentar imprecisões e os resultados devem ser revisados pelo usuário antes de qualquer utilização profissional.

Possíveis evoluções incluem importação de currículos em PDF ou DOCX, exportação em DOCX, histórico de análises e comparação entre versões de um mesmo currículo.

## Autor

Desenvolvido por [Christian Stoffel](https://github.com/christianstoffel), como parte do Bootcamp DIO — Vibe Coding.

## Aviso

O MatchCV ATS é uma ferramenta de apoio à elaboração de currículos. Não possui vínculo com plataformas de recrutamento e não garante aprovação em sistemas ATS ou processos seletivos.
