import { type Request, type Response } from "express"
import { prisma } from "../prisma/client"

import { transactionSchema } from "../schemas/transactionSchema"

interface AuthRequest extends Request {
    userId?: number
}

export const getTransactions = async (req: AuthRequest, res: Response) => {
    try {

        const transactions = await prisma.transaction.findMany({
            where: { userId: req.userId! },
            orderBy: { date: "desc" }
        })

        res.json(transactions)

    } catch (e) {
        res.status(500).json({ error: "Erro ao buscar transações" })
    }
}

export const createTransaction = async (req: AuthRequest, res: Response) => {
    try {
        const validation = transactionSchema.safeParse(req.body)
        if (!validation.success)
            return res.status(400).json({
                errors: validation.error!.issues.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            })
        const { title, amount, type, category } = validation.data

        const transaction = await prisma.transaction.create({
            data: {
                title, amount, type, category, userId: req.userId!
            }
        })

        res.status(201).json(transaction)

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar transação" })
    }

}

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
    const { id } = req.params

    try {

        const deleted = await prisma.transaction.deleteMany({
            where: {
                id: Number(id),
                userId: req.userId!
            }
        })

        if (deleted.count === 0)
            return res.status(400).json({ error: "Transação não encontrada" })

        res.status(200).json({ message: "Transação deletada com sucesso" })

    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar transação" })
    }

}