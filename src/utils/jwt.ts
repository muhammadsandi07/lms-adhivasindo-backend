import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshsecret"

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" })
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET)
}
