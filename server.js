// CORREÇÃO: Importa as bibliotecas necessárias para que o Node.js as reconheça
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Define a porta onde o servidor irá rodar.
// O processo é um ambiente do Render que define a porta automaticamente.
const port = process.env.PORT || 3000; 

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});
