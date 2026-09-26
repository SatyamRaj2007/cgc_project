import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import healthRouter from './routes/health.js'
import academicsRouter from './routes/academics.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
const allowedOrigins = new Set(env.clientUrl.split(',').map((value) => {
  try {
    return new URL(value.trim()).origin
  } catch {
    return null
  }
}).filter(Boolean))
app.use(cors({ origin: (origin, callback) => {
  if (!origin) return callback(null, true)
  try {
    return callback(null, allowedOrigins.has(new URL(origin).origin))
  } catch {
    return callback(null, false)
  }
} }))
app.use(express.json({ limit: '1mb' }))
app.use('/api/v1/health', healthRouter)
app.use('/api/v1/academics', academicsRouter)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found' } })
})

app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error)
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
    ? error.status
    : Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode < 600
      ? error.statusCode
      : 500
  if (status >= 500) console.error(error)
  const message = status === 400 && error.type === 'entity.parse.failed'
    ? 'Request body must contain valid JSON.'
    : status === 413
      ? 'Request body is too large.'
      : status >= 500
        ? 'Internal server error'
        : 'Request could not be processed.'
  res.status(status).json({ success: false, error: { message } })
})

export default app

