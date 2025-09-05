import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export function authMiddleware(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]
  if (!authHeader)
    return res.status(401).json({ message: "Missing Authorization header" })

  const [scheme, token] = authHeader.split(" ")
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ message: "Invalid Authorization header" })

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any
    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}
