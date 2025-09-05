import { Router } from "express"
import {
  login,
  register,
  refresh,
  logout,
} from "../controllers/auth.controllers"
import { registerSchema, loginSchema } from "@/validator/auth.validator"
import validate from "@/utils/validate"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/refresh", refresh)
router.post("/logout", logout)

export default router
