import { PrismaClient } from "@prisma/client"

async function test() {
  const categories = await prisma.category.findMany()
  console.log(categories)
}
test()
export const prisma = new PrismaClient()
