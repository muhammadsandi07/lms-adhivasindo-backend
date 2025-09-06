import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { prisma } from "../utils/prisma"
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt"

// REGISTER
export async function register(req: Request, res: Response) {
  const { name, email, password, image } = req.body
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing)
    return res.status(400).json({ message: "Email already registered" })

  const passwordHash = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  )
  const user = await prisma.user.create({
    data: { name, email, password, image },
  })

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  })
}

// LOGIN
export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: "Invalid credentials" })

  const accessToken = generateAccessToken({ id: user.id, email: user.email })
  const refreshToken = generateRefreshToken({ id: user.id })

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    },
  })

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  })
}

// REFRESH
export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body
  if (!refreshToken)
    return res.status(400).json({ message: "Missing refresh token" })

  try {
    const payload: any = verifyRefreshToken(refreshToken)

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    })
    if (!stored)
      return res.status(401).json({ message: "Invalid refresh token" })
    if (stored.expiresAt < new Date())
      return res.status(401).json({ message: "Refresh token expired" })

    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
    })
    res.json({ accessToken })
  } catch {
    res.status(401).json({ message: "Invalid refresh token" })
  }
}

// LOGOUT
export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } })
  }
  res.json({ message: "Logged out" })
}
