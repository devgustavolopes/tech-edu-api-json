// 1. IMPORTAÇÕES NECESSÁRIAS
const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors'); // <--- NOVO: Importa o CORS

const server = express();
const router = jsonServer.router('db.json'); // Aponta para o seu arquivo de dados
const middlewares = jsonServer.defaults();

// --- CONFIGURAÇÃO DO CORS (A SOLUÇÃO PARA O SEU PROBLEMA) ---
// 2. DEFINE AS ORIGENS PERMITIDAS
// O link do seu Vercel e o localhost para testes
const allowedOrigins = [
    'https://techeduhospedagem-13v684bo9-devgustavolopes-projects.vercel.app', 
    'http://localhost:3000' // Para testes locais
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (ex: apps mobile, postman) e das origens permitidas
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            // Rejeita outras requisições
            callback(new Error('Not allowed by CORS'));
        }
    }
}

// 3. APLICA O MIDDLEWARE CORS
server.use(cors(corsOptions)); // Aplica a política de CORS
// -----------------------------------------------------------


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
