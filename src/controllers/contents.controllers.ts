import { Request, Response } from "express"
import { prisma } from "../utils/prisma"

// ✅ List contents with pagination, search, include category & pemateri
export async function listContents(req: Request, res: Response) {
  try {
    const search = req.query.search?.toString() || ""
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const [items, total] = await Promise.all([
      prisma.content.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { body: { contains: search, mode: "insensitive" } },
          ],
        },
        include: {
          category: { select: { id: true, name: true, description: true } },
          pemateri: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.content.count({
        where: {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { body: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    ])

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch contents" })
  }
}

// ✅ Get content by ID
export async function getContent(req: Request, res: Response) {
  try {
    const { id } = req.params
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, description: true } },
        pemateri: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    })

    if (!content) return res.status(404).json({ message: "Content not found" })

    res.json(content)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch content" })
  }
}

// ✅ Create content
export async function createContent(req: any, res: Response) {
  try {
    const { title, body, thumbnail, categoryId, pemateriId } = req.body

    const content = await prisma.content.create({
      data: {
        title,
        body,
        thumbnail,
        categoryId,
        pemateriId,
      },
    })

    res.status(201).json(content)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create content" })
  }
}

// ✅ Update content
export async function updateContent(req: any, res: Response) {
  try {
    const { id } = req.params
    const { title, body, thumbnail, categoryId, pemateriId } = req.body

    const content = await prisma.content.update({
      where: { id },
      data: { title, body, thumbnail, categoryId, pemateriId },
    })

    res.json(content)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update content" })
  }
}

// ✅ Delete content
export async function deleteContent(req: Request, res: Response) {
  try {
    const { id } = req.params
    await prisma.content.delete({ where: { id } })
    res.json({ message: "Content deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete content" })
  }
}

export async function getContentsByCategory(req: Request, res: Response) {
  try {
    const { id } = req.params
    const contents = await prisma.content.findMany({
      where: { categoryId: id },
      include: {
        category: { select: { id: true, name: true, description: true } },
        pemateri: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    res.json(contents)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch category contents" })
  }
}
