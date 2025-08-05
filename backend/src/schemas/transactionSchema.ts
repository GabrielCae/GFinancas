import { z } from "zod"

export const transactionSchema = z.object({
    title: z.string().min(1, "Forneça um nome para a transação"),
    amount: z.number().positive("O valor deve ser positivo"),
    type: z.enum(["despesa", "depósito"], "O tipo deve ser 'despesa' ou 'depósito'"),
    category: z.string().min(1, "Forneça uma categoria para a transação")
})