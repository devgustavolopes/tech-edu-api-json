const jsonServer = require('json-server');
const path = require('path');
const express = require('express'); // Adiciona Express
const cors = require('cors');       // Adiciona CORS

const server = express();           // Cria o servidor Express
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// 1. Configuração do CORS (NOVO PASSO CRÍTICO)
// Permite acesso de qualquer origem, mas se for mais seguro, você pode usar:
// const corsOptions = { origin: 'https://src-three-wheat.vercel.app' };
server.use(cors()); 

// 2. Middlewares padrões (logs, etc.)
server.use(middlewares);

// 3. Rotas JSON Server
server.use(router);

// Define a porta do Render (o processo que define)
const port = process.env.PORT || 3000; 

server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port} com CORS habilitado!`);
});
