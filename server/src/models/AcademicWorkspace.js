import mongoose from 'mongoose'

const academicWorkspaceSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true })

export const AcademicWorkspace = mongoose.models.AcademicWorkspace
  || mongoose.model('AcademicWorkspace', academicWorkspaceSchema)
