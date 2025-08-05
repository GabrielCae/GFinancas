import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET: string = process.env.JWT_SECRET || "secret"

interface AuthRequest extends Request {
    userId?: number
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: "Token não fornecido" })

    const token = authHeader.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Token não fornecido" })
    console.log(authHeader)

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" })
    }
}
