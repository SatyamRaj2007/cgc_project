import { Router } from 'express'
import mongoose from 'mongoose'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      service: 'cgc-smart-campus-api',
      timestamp: new Date().toISOString(),
      storage: mongoose.connection.readyState === 1 ? 'mongodb' : 'memory',
    },
  })
})

export default router
