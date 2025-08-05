import { type Request, type Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../prisma/client"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    try {

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser)
            return res.status(400).json({ error: "E-mail já registrado" })

        const hashedPassword = await bcrypt.hashSync(String(password), 10)
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        })

        res.status(201).json({ message: "Usuário criado com sucesso!", userId: user.id })

    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar" })
        console.error(err)
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(401).json({ error: "Usuário não encontrado" })

        const passwordMatch = await bcrypt.compare(String(password), String(user.password))
        if (!passwordMatch) return res.status(401).json({ error: "Senha incorreta" })

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

        res.json({ token })

    } catch (err) {
        res.status(500).json({ error: "Erro ao fazer login" })
        console.error(err)
    }

}