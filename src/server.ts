import express from "express"
import cors from "cors"

import config from "@/config"

import type { CorsOptions } from "cors"
const app = express()

app.get("/", (req, res) => {
  res.json({ message: "Hello world" })
})
app.listen(config.PORT, () => {
  console.log(`server running: http://localhost:${config.PORT}`)
})
