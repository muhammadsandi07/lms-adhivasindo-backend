import express from "express"
import cors from "cors"
import contentsRoutes from "@/routes/contents.routes"
import config from "@/config"

const app = express()
import type { CorsOptions } from "cors"

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error(`CORS error: ${origin} is not allowed`))
    }
    console.log(`CORS error: ${origin} is not allowed by CORS`)
  },
}
app.use(cors(corsOptions))
app.use(express.json())
app.get("/", (req, res) => {
  res.json({ message: "Hello world" })
})

app.use("/api/contents", contentsRoutes)
app.listen(config.PORT, () => {
  console.log(`server running: http://localhost:${config.PORT}`)
})
