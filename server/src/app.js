import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import healthRouter from './routes/health.js'
import academicsRouter from './routes/academics.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
const allowedOrigins = env.clientUrl.split(',').map((origin) => origin.trim())
app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)) }))
app.use(express.json({ limit: '1mb' }))
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/academics', academicsRouter)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } })
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ success: false, error: { message: 'Internal server error' } })
})

export default app
