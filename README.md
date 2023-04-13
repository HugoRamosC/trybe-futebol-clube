# Projeto Trybe Futebol Clube

[MEUS COMMITS](https://github.com/HugoRamosC/trybe-futebol-clube/commits)

## O que foi desenvolvido?

Um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou regras de negócio providas no projeto e a API é consumida por um front-end já provido no início do projeto.


### Tecnologias utilizadas:

- ORM e operações em banco de dados relacional
- Containers Docker
- Node.js: ORM e Autenticação
- Node.js: API REST com Express


### Requisitos obrigatórios do Projeto

- [x] 1 - Desenvolva a _migration_ e o _model_ que representa a tabela de times nos respectivos diretórios no caminho `/app/backend/src/database`
- [x] 2 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos do diretório `/app/backend/src`, com um mínimo de 7 linhas cobertas
- [x] 3 - Desenvolva o _endpoint_ `/teams` no back-end de forma que ele possa retornar corretamente todos os times
- [x] 4 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 19 linhas cobertas
- [x] 5 - Desenvolva o _endpoint_ `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico
- [x] 6 - Desenvolva a _migration_ e o _model_ que representa a tabela de pessoas usuárias nos respectivos diretórios no caminho `/app/backend/src/database` 
- [x] 7 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 25 linhas cobertas
- [x] 8 - Desenvolva o _endpoint_ `/login `no back-end de maneira que ele permita o acesso com dados válidos no front-end
- [x] 9 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 35 linhas cobertas
- [x] 10 - Desenvolva o _endpoint_ `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end
- [x] 11 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 45 linhas cobertas
- [x] 12 - Desenvolva um _middleware_ de validação para o _token_, verificando se ele é válido, e desenvolva o _endpoint_ `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end
- [x] 13 - Desenvolva a _migration_ e o _model_ que representa a tabela de partidas nos respectivos diretórios no caminho `/app/backend/src/database` 
- [x] 14 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 70 linhas cobertas
- [x] 15 - Desenvolva o _endpoint_ `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end
- [x] 16 - Desenvolva o _endpoint_ `/matches` de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end
- [x] 17 - Desenvolva o _endpoint_ `/matches/:id/finish` de modo que seja possível finalizar uma partida no banco de dados
- [x] 18 - Desenvolva o _endpoint_ `/matches/:id` de forma que seja possível atualizar partidas em andamento
- [x] 19 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 80 linhas cobertas
- [x] 20 - Desenvolva o _endpoint_ `/matches` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados
- [x] 21 - Desenvolva o _endpoint_ `/matches` de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times
- [x] 23 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: _name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor_ e _goalsOwn_
- [x] 24 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades _goalsBalance_ e _efficiency_, além das propriedades do requisito anterior
- [x] 25 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [x] 26 - Desenvolva o _endpoint_ `/leaderboard/away` de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: _name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor_ e _goalsOwn_
- [x] 27 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
- [x] 28 - Desenvolva o _endpoint_ `/leaderboard/away` de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [x] 29 - Desenvolva o _endpoint_ `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

## Requisitos Bônus

- [x] 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 100 linhas cobertas
- [x] 30 - (Bônus) Desenvolva o _endpoint_ `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC
