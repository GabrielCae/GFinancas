import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Forneça um nome!"),
    email: z.email("E-mail inválido!"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!")
})

export const loginSchema = z.object({
    email: z.email("E-mail inválido!"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres!")
})