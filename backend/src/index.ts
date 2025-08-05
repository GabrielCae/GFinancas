import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth"
import transactionRoutes from "./routes/transactions"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// === Rotas ===
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})