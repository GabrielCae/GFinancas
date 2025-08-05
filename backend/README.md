# BFinanças - Backend

API em Node.js + TypeScript para controle de transações financeiras com autenticação segura via JWT.

## Tecnologias usadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)
- [CORS](https://github.com/expressjs/cors)
- [Nodemon](https://github.com/remy/nodemon)

## Como rodar o projeto

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor em modo desenvolvimento
npm run dev
```

## Estrutura do Projeto
```bash
src/
├── index.ts               # Ponto de entrada do servidor
├── routes/
│   ├── auth.ts            # Rotas de autenticação (login e registro)
│   └── transactions.ts    # Rotas protegidas para transações
├── controllers/
│   ├── authController.ts
│   └── transactionController.ts
├── middleware/
│   └── authMiddleware.ts  # Middleware que protege rotas com JWT
```

## Autenticação

- A autenticação foi baseada em JWT


## Autor
Gabriel Caetano - @GabrielCae