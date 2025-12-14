// 1. IMPORTAÇÕES NECESSÁRIAS
const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors'); // <--- CORREÇÃO: Importa o CORS

const server = express();
const router = jsonServer.router('db.json'); // Aponta para o seu arquivo de dados
const middlewares = jsonServer.defaults();

// --- CONFIGURAÇÃO DO CORS (A SOLUÇÃO PARA A CONEXÃO VERCEL <-> RENDER) ---
// 2. DEFINE AS ORIGENS PERMITIDAS
// Esta é a URL EXATA do seu projeto no Vercel.
const allowedOrigins = [
    // Seu Vercel:
    'https://techeduhospedagem-13v684bo9-devgustavolopes-projects.vercel.app', 
    // Localhost para testes (opcional):
    'http://localhost:3000' 
];

const corsOptions = {
    origin: function (origin, callback) {
        // Se a requisição vem de uma origem permitida OU se é uma requisição sem 'origin' (ex: Postman), permite.
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            // Rejeita outras requisições
            callback(new Error('Not allowed by CORS'));
        }
    }
}

// 3. APLICA O MIDDLEWARE CORS
server.use(cors(corsOptions)); 
// ----------------------------------------------------------


// Aplica os middlewares padrão do json-server (logging, etag, etc)
server.use(middlewares); 

// Permite o Express/JSON Server ler o corpo das requisições JSON (para POST, PUT, PATCH)
server.use(express.json());

// Monta o JSON Server no Express
server.use(router);

// Configuração da porta
const port = process.env.PORT || 3001; 

// Inicia o servidor
server.listen(port, () => {
    console.log(`JSON Server está rodando na porta ${port}`);
});
