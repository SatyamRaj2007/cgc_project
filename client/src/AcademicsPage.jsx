import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, CalendarDays, Check, Circle, Clock3, Plus, Trash2 } from 'lucide-react'
import { loadAcademicWorkspace, saveAcademicWorkspace } from './api/academics.js'

const storageKey = 'cgc-smart-campus-academics-v1'
const pendingKey = `${storageKey}-pending`

const initialData = {
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

function readData() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    if (saved?.subjects && saved?.assignments) return saved
  } catch {
    // Start with sample data if browser storage is unavailable or malformed.
  }
  return initialData
}

function hasSavedData() {
  try {
    return localStorage.getItem(storageKey) !== null
  } catch {
    return false
  }
}

function hasPendingChanges() {
  try {
    return localStorage.getItem(pendingKey) === 'true'
  } catch {
    return false
  }
}

function markPendingChanges(pending) {
  try {
    if (pending) localStorage.setItem(pendingKey, 'true')
    else localStorage.removeItem(pendingKey)
  } catch {
    // The current session can still sync even if browser storage is disabled.
  }
}

function saveData(data) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data))
  } catch {
    // The planner still works for this session when storage is disabled.
  }
  window.dispatchEvent(new CustomEvent('cgc:academics-updated', { detail: data }))
}

function percentage(subject) {
  return subject.total ? Math.round((subject.attended / subject.total) * 100) : 0
}

function dueLabel(date) {
  const due = new Date(`${date}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Math.round((due - today) / 86_400_000)
  if (days < 0) return 'Overdue'
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `Due ${due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
}

export default function AcademicsPage() {
  const [data, setData] = useState(readData)
  const dataRef = useRef(data)
  const mutationRef = useRef(0)
  const saveQueueRef = useRef(Promise.resolve())
  const [formOpen, setFormOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(data.subjects[0]?.name || '')
  const [due, setDue] = useState('')
  const [filter, setFilter] = useState('all')
  const [storageStatus, setStorageStatus] = useState('connecting')

  useEffect(() => {
    let active = true
    const localExists = hasSavedData()
    const localPending = hasPendingChanges()
    loadAcademicWorkspace()
      .then((result) => {
        if (!active) return
        if (result.data?.subjects && result.data?.assignments) {
          const localWins = localPending || mutationRef.current > 0 || (localExists && result.storage !== 'mongodb')
          if (localWins) {
            const localData = dataRef.current
            setData(localData)
            queueRemoteSave(localData, mutationRef.current, () => active)
          } else {
            dataRef.current = result.data
            setData(result.data)
            saveData(result.data)
          }
        }
        setStorageStatus(result.storage || 'api')
      })
      .catch(() => {
        if (active) setStorageStatus('local')
      })
    return () => { active = false }
  }, [])

  function queueRemoteSave(next, version, isActive = () => true) {
    saveQueueRef.current = saveQueueRef.current
      .catch(() => undefined)
      .then(() => saveAcademicWorkspace(next))
      .then((result) => {
        if (!isActive()) return
        setStorageStatus(result.storage || 'api')
        if (version === mutationRef.current) markPendingChanges(false)
      })
      .catch(() => {
        if (isActive()) setStorageStatus('local')
      })
  }

  const average = useMemo(() => {
    const total = data.subjects.reduce((sum, item) => sum + item.total, 0)
    const attended = data.subjects.reduce((sum, item) => sum + item.attended, 0)
    return total ? Math.round((attended / total) * 100) : 0
  }, [data.subjects])

  function updateData(next) {
    dataRef.current = next
    const version = ++mutationRef.current
    setData(next)
    saveData(next)
    markPendingChanges(true)
    queueRemoteSave(next, version)
  }

  function recordAttendance(id, present) {
    updateData({
      ...data,
      subjects: data.subjects.map((item) => item.id === id
        ? { ...item, total: item.total + 1, attended: item.attended + (present ? 1 : 0) }
        : item),
    })
  }

  function addAssignment(event) {
    event.preventDefault()
    if (!title.trim() || !due) return
    updateData({
      ...data,
      assignments: [{ id: crypto.randomUUID(), title: title.trim(), subject, due, done: false }, ...data.assignments],
    })
    setTitle('')
    setDue('')
    setFormOpen(false)
  }

  function toggleAssignment(id) {
    updateData({ ...data, assignments: data.assignments.map((item) => item.id === id ? { ...item, done: !item.done } : item) })
  }

  function deleteAssignment(id) {
    updateData({ ...data, assignments: data.assignments.filter((item) => item.id !== id) })
  }

  const visibleAssignments = data.assignments.filter((item) => filter === 'all' || (filter === 'open' ? !item.done : item.done))
  const openCount = data.assignments.filter((item) => !item.done).length

  return (
    <div className="academic-page">
      <section className="module-heading">
        <div>
          <div className="eyebrow"><span className={`live-dot ${storageStatus === 'local' ? 'offline-dot' : ''}`} /> YOUR LEARNING, IN ONE PLACE</div>
          <h1>My academics</h1>
          <p className="welcome-subtitle">Keep an eye on attendance and stay ahead of your coursework.</p>
        </div>
        <div className="module-actions"><span className={`storage-status ${storageStatus}`} title={storageStatus === 'memory' ? 'Data is on the API and may reset when it restarts.' : undefined}>{storageStatus === 'connecting' ? 'Connecting…' : storageStatus === 'mongodb' ? 'Cloud sync on' : storageStatus === 'memory' ? 'API connected · temporary storage' : 'Saved on this device'}</span><button className="primary-button" onClick={() => setFormOpen((value) => !value)}><Plus size={16} /> Add assignment</button></div>
      </section>

      <section className="academic-summary">
        <article className="academic-summary-card"><span className="academic-summary-icon blue"><BookOpen size={17} /></span><div><small>Overall attendance</small><strong>{average}%</strong><span>Across {data.subjects.length} subjects</span></div><span className={`attendance-tag ${average >= 75 ? 'safe' : 'low'}`}>{average >= 75 ? 'On track' : 'Below 75%'}</span></article>
        <article className="academic-summary-card"><span className="academic-summary-icon violet"><Clock3 size={17} /></span><div><small>Open assignments</small><strong>{openCount}</strong><span>{openCount === 1 ? 'task' : 'tasks'} to complete</span></div><span className="summary-arrow"><ArrowUpRight size={16} /></span></article>
        <article className="academic-summary-card"><span className="academic-summary-icon green"><Check size={17} /></span><div><small>Completed</small><strong>{data.assignments.filter((item) => item.done).length}</strong><span>Assignments finished</span></div><span className="summary-arrow"><ArrowUpRight size={16} /></span></article>
      </section>

      <section className="academic-layout">
        <article className="panel subject-panel">
          <div className="panel-heading"><div><h2>Attendance by subject</h2><p>Record each class after it ends</p></div><span className="attendance-threshold"><Circle size={8} /> 75% minimum</span></div>
          <div className="subject-list">
            {data.subjects.map((item) => {
              const rate = percentage(item)
              return <div className="subject-row" key={item.id}>
                <span className={`subject-mark ${item.color}`}><BookOpen size={15} /></span>
                <div className="subject-main"><div className="subject-title"><strong>{item.name}</strong><span>{item.code}</span></div><small>{item.room} <i>·</i> {item.attended}/{item.total} classes attended</small><div className="attendance-track"><span className={rate < 75 ? 'below' : ''} style={{ width: `${rate}%` }} /></div></div>
                <div className="subject-rate"><strong className={rate < 75 ? 'below' : ''}>{rate}%</strong><span>{rate < 75 ? 'Needs attention' : 'On track'}</span></div>
                <div className="attendance-actions"><button aria-label={`Mark ${item.name} present`} title="Mark present" onClick={() => recordAttendance(item.id, true)}><Check size={14} /></button><button aria-label={`Mark ${item.name} absent`} title="Mark absent" onClick={() => recordAttendance(item.id, false)}><ArrowDown size={14} /></button></div>
              </div>
            })}
          </div>
          <div className="attendance-note"><span className="note-dot" /> Use the check or absence control once a class has ended.</div>
        </article>

        <article className="panel assignment-panel">
          <div className="panel-heading"><div><div className="panel-title-line"><h2>Assignments</h2><span className="count-pill">{openCount} open</span></div><p>Your coursework and due dates</p></div></div>
          {formOpen && <form className="assignment-form" onSubmit={addAssignment}>
            <label>Assignment title<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Lab report" required maxLength={100} /></label>
            <div className="assignment-form-row"><label>Subject<select value={subject} onChange={(event) => setSubject(event.target.value)}>{data.subjects.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label><label>Due date<input type="date" value={due} onChange={(event) => setDue(event.target.value)} required /></label></div>
            <div className="form-actions"><button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button><button className="primary-button" type="submit"><Plus size={14} /> Save assignment</button></div>
          </form>}
          <div className="assignment-toolbar"><div className="assignment-filters"><button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All</button><button className={filter === 'open' ? 'selected' : ''} onClick={() => setFilter('open')}>To do</button><button className={filter === 'done' ? 'selected' : ''} onClick={() => setFilter('done')}>Done</button></div><button className="add-small" onClick={() => setFormOpen((value) => !value)}><Plus size={14} /> Add</button></div>
          <div className="assignment-list">
            {visibleAssignments.length ? visibleAssignments.map((item) => <div className={`assignment-row ${item.done ? 'is-done' : ''}`} key={item.id}>
              <button className="assignment-check" aria-label={item.done ? 'Mark incomplete' : 'Mark complete'} onClick={() => toggleAssignment(item.id)}>{item.done && <Check size={12} />}</button>
              <div className="assignment-copy"><strong>{item.title}</strong><small>{item.subject}</small></div>
              <span className={`due-label ${!item.done && dueLabel(item.due) === 'Overdue' ? 'overdue' : ''}`}><CalendarDays size={12} /> {item.done ? 'Completed' : dueLabel(item.due)}</span>
              <button className="delete-assignment" aria-label="Delete assignment" onClick={() => deleteAssignment(item.id)}><Trash2 size={13} /></button>
            </div>) : <div className="empty-assignments"><BookOpen size={19} /><strong>Nothing here yet</strong><span>Add an assignment to keep track of what’s next.</span></div>}
          </div>
        </article>
      </section>
      <p className="local-data-note">{storageStatus === 'mongodb' ? 'Changes sync to MongoDB for this browser workspace. Sign-in is not enabled yet.' : storageStatus === 'memory' ? 'The API is connected, but its temporary storage can reset. A copy is saved in this browser.' : storageStatus === 'connecting' ? 'Loading your saved planner…' : 'The API is unavailable. Changes stay in this browser and will sync when it reconnects.'}</p>
    </div>
  )
}

