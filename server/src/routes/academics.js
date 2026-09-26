import { Router } from 'express'
import mongoose from 'mongoose'
import { AcademicWorkspace } from '../models/AcademicWorkspace.js'

const router = Router()
const memoryWorkspaces = new Map()
const sessionPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const sampleWorkspace = {
  subjects: [
    { id: 'cs301', code: 'CS 301', name: 'Data Structures & Algorithms', attended: 27, total: 30, room: 'Block A · Room 204', color: 'blue' },
    { id: 'cs305', code: 'CS 305', name: 'Database Management Systems', attended: 25, total: 30, room: 'Block B · Lab 1', color: 'violet' },
    { id: 'cs303', code: 'CS 303', name: 'Operating Systems', attended: 22, total: 28, room: 'Block A · Room 108', color: 'green' },
    { id: 'ma201', code: 'MA 201', name: 'Applied Mathematics', attended: 26, total: 28, room: 'Block C · Room 312', color: 'amber' },
  ],
  assignments: [
    { id: 'a1', title: 'Binary search tree implementation', subject: 'Data Structures & Algorithms', due: '2026-09-29', done: false },
    { id: 'a2', title: 'Normalize the library database schema', subject: 'Database Management Systems', due: '2026-10-01', done: false },
    { id: 'a3', title: 'Process scheduling worksheet', subject: 'Operating Systems', due: '2026-10-03', done: true },
  ],
}

function getSessionId(req, res) {
  const sessionId = req.get('X-Campus-Session')
  if (!sessionId || !sessionPattern.test(sessionId)) {
    res.status(400).json({ success: false, error: { message: 'A valid campus session ID is required.' } })
    return null
  }
  return sessionId
}

function storageMode() {
  return mongoose.connection.readyState === 1 ? 'mongodb' : 'memory'
}

router.get('/', async (req, res, next) => {
  const sessionId = getSessionId(req, res)
  if (!sessionId) return

  try {
    if (storageMode() === 'mongodb') {
      const saved = await AcademicWorkspace.findOne({ sessionId }).lean()
      return res.json({ success: true, data: saved?.data || sampleWorkspace, storage: 'mongodb' })
    }
    return res.json({ success: true, data: memoryWorkspaces.get(sessionId) || sampleWorkspace, storage: 'memory' })
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  const sessionId = getSessionId(req, res)
  if (!sessionId) return

  const { subjects, assignments } = req.body || {}
  const validSubjects = Array.isArray(subjects) && subjects.length <= 100 && subjects.every((subject) =>
    typeof subject.id === 'string' && typeof subject.name === 'string'
    && Number.isInteger(subject.attended) && Number.isInteger(subject.total)
    && subject.attended >= 0 && subject.total >= subject.attended && subject.total <= 10000)
  const validAssignments = Array.isArray(assignments) && assignments.length <= 500 && assignments.every((item) =>
    typeof item.id === 'string' && typeof item.title === 'string' && item.title.trim().length > 0
    && item.title.length <= 100 && typeof item.subject === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(item.due) && typeof item.done === 'boolean')

  if (!validSubjects || !validAssignments) {
    return res.status(400).json({ success: false, error: { message: 'Academic workspace data is invalid.' } })
  }

  const data = { subjects, assignments }
  try {
    if (storageMode() === 'mongodb') {
      await AcademicWorkspace.findOneAndUpdate(
        { sessionId },
        { $set: { data } },
        { upsert: true, new: true, runValidators: true },
      )
      return res.json({ success: true, data, storage: 'mongodb' })
    }
    memoryWorkspaces.set(sessionId, data)
    return res.json({ success: true, data, storage: 'memory' })
  } catch (error) {
    next(error)
  }
})

export default router
