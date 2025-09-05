import { Request, Response } from "express"
import { prisma } from "../utils/prisma"

// List contents with search & pagination
export async function listContents(req: Request, res: Response) {
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

  res.json({ page, limit, total, items })
}

export async function getContent(req: Request, res: Response) {
  const id = Number(req.params.id)
  const content = await prisma.content.findUnique({
    where: { id },
    include: { pemateri: { select: { id: true, name: true, image: true } } },
  })
  if (!content) return res.status(404).json({ message: "Not found" })
  res.json(content)
}

export async function createContent(req: any, res: Response) {
  const { title, body, pemateriId } = req.body
  const content = await prisma.content.create({
    data: { title, body, authorId: req.user.id, pemateriId },
  })
  res.status(201).json(content)
}

export async function updateContent(req: any, res: Response) {
  const id = Number(req.params.id)
  const { title, body, pemateriId } = req.body
  const content = await prisma.content.update({
    where: { id },
    data: { title, body, pemateriId },
  })
  res.json(content)
}

export async function deleteContent(req: Request, res: Response) {
  const id = Number(req.params.id)
  await prisma.content.delete({ where: { id } })
  res.json({ message: "Deleted" })
}
