import app from './app.js'
import { env } from './config/env.js'
import mongoose from 'mongoose'

if (env.mongoUri) {
  mongoose.connect(env.mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB unavailable; using in-memory academic data:', error.message))
} else {
  console.warn('MONGODB_URI is not configured; academic data will be held in memory until the API restarts')
}

const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`CGC Smart Campus API listening on http://localhost:${env.port}`)
})

function shutdown(signal) {
  console.log(`${signal} received; shutting down API server`)
  server.close(() => process.exit(0))
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
