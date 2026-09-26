import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import healthRouter from './routes/health.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: env.clientUrl }))
app.use(express.json({ limit: '1mb' }))
app.use('/api/v1/health', healthRouter)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } })
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ success: false, error: { message: 'Internal server error' } })
})

export default app
