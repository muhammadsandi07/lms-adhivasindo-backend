import { Router } from "express"
import {
  listContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  getContentsByCategory, // 🔥 tambahan
} from "@/controllers/contents.controllers" // pastikan nama file controller singkat, bukan `contents.controllers`

import {
  createContentSchema,
  updateContentSchema,
} from "@/validator/contents.validator"

import validate from "@/utils/validate"
import { authMiddleware } from "@/middlewares/auth.middleware"

const router = Router()

// ✅ GET /contents?page=1&limit=10&search=backend
router.get("/", authMiddleware, listContents)

// ✅ GET /contents/category/:id → semua konten per kategori
router.get("/category/:id", authMiddleware, getContentsByCategory)

// ✅ POST /contents
router.post("/", authMiddleware, validate(createContentSchema), createContent)

// ✅ GET /contents/:id
router.get("/:id", authMiddleware, getContent)

// ✅ PUT /contents/:id
router.put("/:id", authMiddleware, validate(updateContentSchema), updateContent)

// ✅ DELETE /contents/:id
router.delete("/:id", authMiddleware, deleteContent)

export default router
