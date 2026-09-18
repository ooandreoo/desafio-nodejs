# Desafio

## Descrição

1. Consumir uma API que retorna dados sobre filmes em formato JSON
2. Modificar as estruturas de dados e disponibilizar uma rota /filmes que retorne a nova estrutura de dados

## Passos a seguir

1. Usei o gemini para gerar um código boilerplate que faça o seguinte: periodicamente consuma uma API para atualizar dados que poderão ser consumidos na rota /filmes
2. Pedi para usar Fastify, TypeScript e versão 24 de Node
3. Modifiquei o código para que resolva o meu problema
4. Procurei exemplos de Dockerfiles para dockerizar a aplicação e ajustei com as minhas necessidades

## Passos para executar

### Com Docker

1. Clone o repository
2. Crie o arquivo .env na pasta raiz tomando como exemplo o arquivo .env.example e preencha os dados faltantes
3. Execute `docker build -t api-gustavo-alzamora .`
4. Execute `docker run -d -p 80:3000 --env-file .env api-gustavo-alzamora`
5. Execute `curl localhost:80/filmes` ou ingrese `localhost:80/filmes` no navegador

### Sem Docker

1. Clone o repository
2. Crie o arquivo .env na pasta raiz tomando como exemplo o arquivo .env.example e preencha os dados faltantes
2. Execute `npm install`
3. Execute `npm run build`
4. Execute `npm run start`
5. Execute `curl localhost:3000/filmes` ou ingrese `localhost:3000/filmes` no navegador

Made by ooandreoo