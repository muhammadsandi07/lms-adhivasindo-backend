import { Router } from "express"
import {
  listContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
} from "@/controllers/contents.controllers"
import {
  createContentSchema,
  updateContentSchema,
} from "@/validator/contents.validator"
import validate from "@/utils/validate"
import { authMiddleware } from "@/middlewares/auth.middleware"

const router = Router()

router.get("/", authMiddleware, listContents)
router.post("/", authMiddleware, validate(createContentSchema), createContent)
router.get("/:id", authMiddleware, getContent)
router.put("/:id", authMiddleware, validate(updateContentSchema), updateContent)
router.delete("/:id", authMiddleware, deleteContent)

export default router
