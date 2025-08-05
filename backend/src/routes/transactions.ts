// src/routes/transactions.ts
import { Router } from "express"
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = Router()

router.use(authMiddleware)

router.get("/", getTransactions)
router.post("/", createTransaction)
router.delete("/:id", deleteTransaction)

export default router
