import { useEffect, useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, Check,
  CalendarDays, CircleHelp, Clock3, Compass, GraduationCap,
  LayoutDashboard, MapPin, Plus, Search, ShieldAlert,
  Sparkles, Users,
} from 'lucide-react'
import AcademicsPage from './AcademicsPage.jsx'
import { loadAcademicWorkspace } from './api/academics.js'

const navGroups = [
  { label: 'CAMPUS', items: [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My academics', icon: BookOpen, badge: '3' },
    { label: 'Campus map', icon: Compass },
    { label: 'Events', icon: CalendarDays },
  ] },
  { label: 'COMMUNITY', items: [
    { label: 'Campus connect', icon: Users },
    { label: 'Report an issue', icon: ShieldAlert },
  ] },
]

const schedule = [
  { time: '09:00', end: '10:00 AM', title: 'Data Structures & Algorithms', room: 'Block A · Room 204', code: 'CS 301', color: 'blue' },
  { time: '10:30', end: '11:30 AM', title: 'Database Management Systems', room: 'Block B · Lab 1', code: 'CS 305', color: 'violet' },
  { time: '12:00', end: '01:00 PM', title: 'Operating Systems', room: 'Block A · Room 108', code: 'CS 303', color: 'green' },
]

const quickLinks = [
  { label: 'Campus map', sub: 'Navigate campus', icon: MapPin, tint: 'blue' },
  { label: 'AI assistant', sub: 'Get a quick answer', icon: Sparkles, tint: 'violet' },
  { label: 'Browse events', sub: 'What’s happening', icon: CalendarDays, tint: 'amber' },
]

const searchablePages = [...navGroups.flatMap((group) => group.items.map((item) => item.label)), 'AI assistant', 'Help center']

function readStoredAcademicData() {
  try {
    const parsed = JSON.parse(localStorage.getItem('cgc-smart-campus-academics-v1'))
    return parsed?.subjects && parsed?.assignments ? parsed : null
  } catch {
    return null
  }
}

function hasPendingAcademicChanges() {
  try {
    return localStorage.getItem('cgc-smart-campus-academics-v1-pending') === 'true'
  } catch {
    return false
  }
}

function App() {
  const [active, setActive] = useState('Overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [academicData, setAcademicData] = useState(readStoredAcademicData)
  const currentDate = new Date()
  const dateLabel = currentDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  const dateEyebrow = currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
  const greeting = currentDate.getHours() < 12 ? 'Good morning' : currentDate.getHours() < 18 ? 'Good afternoon' : 'Good evening'
  const searchResults = useMemo(() => searchQuery.trim()
    ? searchablePages.filter((page) => page.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [], [searchQuery])

  useEffect(() => {
    let mounted = true
    const handleAcademicUpdate = (event) => setAcademicData(event.detail)
    window.addEventListener('cgc:academics-updated', handleAcademicUpdate)

    loadAcademicWorkspace()
      .then((result) => {
        if (!mounted || !result.data?.subjects || !result.data?.assignments) return
        const localData = readStoredAcademicData()
        const localWins = localData && (result.storage !== 'mongodb' || hasPendingAcademicChanges())
        setAcademicData(localWins ? localData : result.data)
      })
      .catch(() => {
        if (mounted) setAcademicData(readStoredAcademicData())
      })

    return () => {
      mounted = false
      window.removeEventListener('cgc:academics-updated', handleAcademicUpdate)
    }
  }, [])

  const attendance = academicData?.subjects?.length
    ? Math.round(academicData.subjects.reduce((sum, item) => sum + item.attended, 0) / academicData.subjects.reduce((sum, item) => sum + item.total, 0) * 100)
    : null
  const openAssignments = academicData?.assignments?.filter((item) => !item.done).length
  const completedAssignments = academicData?.assignments?.filter((item) => item.done).length

  function openPage(page) {
    setActive(page)
    setSearchQuery('')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="CGC Smart Campus home">
          <span className="brand-mark"><GraduationCap size={21} strokeWidth={2.2} /></span>
          <span className="brand-name">cgc<span>smart</span></span>
        </a>

        <div className="campus-switcher">
          <span className="campus-avatar">C</span>
          <span className="campus-copy"><strong>CGC Mohali</strong><small>Student workspace</small></span>
        </div>

        <div className="nav-groups">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-label">{group.label}</p>
              {group.items.map(({ label, icon: Icon, badge }) => (
                <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => openPage(label)}>
                  <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-spacer" />
        <div className="help-card">
          <span className="help-icon"><CircleHelp size={16} /></span>
          <strong>Need a hand?</strong>
          <p>Your campus, made a little easier.</p>
          <button onClick={() => openPage('Help center')}>Visit help center <ArrowRight size={13} /></button>
        </div>
        <div className="profile">
          <span className="profile-avatar">AS</span>
          <span className="profile-copy"><strong>Alex Sharma</strong><small>Computer Science · Sem 5</small></span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{active}</strong></div>
          <div className="top-actions">
            <div className="search-wrap">
              <label className="search-box"><Search size={16} /><input aria-label="Search campus pages" placeholder="Search campus pages..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchQuery(''); if (event.key === 'Enter' && searchResults[0]) openPage(searchResults[0]) }} /></label>
              {searchQuery.trim() && <div className="search-results">{searchResults.length ? searchResults.map((page) => <button key={page} onClick={() => openPage(page)}>{page}<ArrowUpRight size={13} /></button>) : <span>No campus pages match “{searchQuery}”.</span>}</div>}
            </div>
            <span className="top-divider" />
            <div className="today-button"><CalendarDays size={15} /> {dateLabel}</div>
          </div>
        </header>

        <div className="page-content">
          {active === 'Overview' ? <>
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> {dateEyebrow}</div>
              <h1>{greeting}, Alex <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">Here’s what’s happening around your campus today.</p>
            </div>
            <button className="primary-button" onClick={() => openPage('Campus connect')}><Plus size={17} /> Quick action</button>
          </section>

          <section className="stat-grid" aria-label="Campus overview">
            <StatCard label="Attendance" value={attendance === null ? '—' : `${attendance}%`} note={academicData ? `Across ${academicData.subjects.length} subjects` : 'Loading planner'} icon={Activity} tone="blue" progress={attendance || 0} />
            <StatCard label="Classes today" value={String(schedule.length)} note="On your timetable" icon={BookOpen} tone="violet" detail="Today" />
            <StatCard label="Open assignments" value={openAssignments === undefined ? '—' : String(openAssignments)} note={academicData ? 'From your planner' : 'Loading planner'} icon={Clock3} tone="amber" detail="To do" />
            <StatCard label="Completed" value={completedAssignments === undefined ? '—' : String(completedAssignments)} note="Assignments finished" icon={Check} tone="green" detail="This term" />
          </section>

          <section className="content-grid">
            <article className="panel schedule-panel">
              <div className="panel-heading">
                <div><div className="panel-title-line"><h2>Today’s schedule</h2><span className="count-pill">{schedule.length} classes</span></div><p>Your day, at a glance</p></div>
                <button className="text-button" onClick={() => openPage('My academics')}>Full timetable <ArrowRight size={14} /></button>
              </div>
              <div className="schedule-list">
                {schedule.map((item) => <div className="class-row" key={item.code}>
                  <div className="class-time"><strong>{item.time}</strong><small>{item.end}</small></div>
                  <div className={`class-marker ${item.color}`}><span /></div>
                  <div className="class-info"><div className="class-title-row"><strong>{item.title}</strong></div><small><MapPin size={12} /> {item.room}</small></div>
                  <span className="class-code">{item.code}</span>
                </div>)}
              </div>
              <button className="schedule-footer" onClick={() => openPage('My academics')}><Clock3 size={14} /> View your attendance and assignments <ArrowRight size={14} /></button>
            </article>

            <article className="assistant-card">
              <div className="assistant-top"><span className="assistant-icon"><Sparkles size={18} /></span><span className="assistant-status"><i /> READY TO HELP</span></div>
              <p className="assistant-kicker">YOUR CAMPUS COMPANION</p>
              <h2>A little help<br />goes a long way.</h2>
              <p className="assistant-description">Ask about your classes, find a spot on campus, or get a head start on your next assignment.</p>
              <button className="assistant-button" onClick={() => openPage('AI assistant')}>Chat with your AI <ArrowUpRight size={15} /></button>
              <div className="assistant-orb orb-one" /><div className="assistant-orb orb-two" />
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel quick-panel">
              <div className="panel-heading compact-heading"><div><h2>Jump right in</h2><p>Common things, one click away</p></div></div>
              <div className="quick-links">{quickLinks.map(({ label, sub, icon: Icon, tint }) => <button className="quick-link" key={label} onClick={() => openPage(label === 'Browse events' ? 'Events' : label)}><span className={`quick-icon ${tint}`}><Icon size={17} /></span><span className="quick-copy"><strong>{label === 'AI assistant' ? 'Ask AI assistant' : label === 'Events' ? 'Browse events' : label}</strong><small>{sub}</small></span><ArrowUpRight size={15} className="quick-arrow" /></button>)}</div>
            </article>

            <article className="panel notice-panel">
              <div className="panel-heading compact-heading"><div><div className="panel-title-line"><h2>Campus bulletin</h2><span className="new-pill">NEW</span></div><p>A few things you might want to know</p></div><button className="text-button" onClick={() => openPage('Events')}>All updates <ArrowRight size={13} /></button></div>
              <div className="notice-item"><span className="notice-icon blue"><CalendarDays size={15} /></span><div><strong>TechFest 2026 registrations are open</strong><p>Join us for two days of ideas, building & good coffee.</p><small>12 min ago <span>·</span> Campus events</small></div><ArrowUpRight size={14} className="notice-arrow" /></div>
              <div className="notice-item"><span className="notice-icon amber"><ArrowDownRight size={15} /></span><div><strong>Library hours extended this week</strong><p>Open until 10 PM through the mid-semester exams.</p><small>2 hours ago <span>·</span> Campus update</small></div><ArrowUpRight size={14} className="notice-arrow" /></div>
            </article>
          </section>

          <footer className="page-footer"><span>Made for the CGC Mohali community <span className="heart">♥</span></span><span><span className="footer-status" /> All systems normal <span className="footer-sep">·</span> v0.1.0</span></footer>
          </> : active === 'My academics' ? <AcademicsPage /> : <ModulePlaceholder name={active} onBack={() => setActive('Overview')} />}
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, change, note, icon: Icon, tone, progress, detail }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={16} /></span></div><div className="stat-value-row"><strong className="stat-value">{value}</strong>{progress ? <span className="progress-ring" style={{ '--progress': `${progress}%` }}><span>{progress}</span></span> : <span className="stat-detail">{detail}</span>}</div><div className="stat-bottom">{change && <span className={`stat-change ${tone}`}><ArrowUpRight size={13} />{change}</span>}{note && <span className="stat-note">{note}</span>}{!change && !note && <span className="stat-note">Classes attended this term</span>}</div></article>
}

function ModulePlaceholder({ name, onBack }) {
  return <section className="module-placeholder"><span className="assistant-icon"><Sparkles size={18} /></span><p className="assistant-kicker">CGC SMART CAMPUS</p><h1>{name}</h1><p>This section is part of the campus workspace. I’m building it out after the academics planner.</p><button className="primary-button" onClick={onBack}><ArrowRight size={15} /> Back to overview</button></section>
}

export default App

