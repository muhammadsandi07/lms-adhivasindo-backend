import { Request, Response } from "express"
import { prisma } from "../utils/prisma"

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { contents: true },
    })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body
    const category = await prisma.category.create({
      data: { name, description },
    })
    res.json(category)
  } catch (err) {
    res.status(500).json({ error: "Failed to create category" })
  }
}
