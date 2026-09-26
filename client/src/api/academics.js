const apiBase = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')
const sessionKey = 'cgc-smart-campus-session-v1'

function getSessionId() {
  let id = localStorage.getItem(sessionKey)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(sessionKey, id)
  }
  return id
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Campus-Session': getSessionId(),
      ...options.headers,
    },
  })
  if (!response.ok) throw new Error(`Campus API returned ${response.status}`)
  return response.json()
}

export async function loadAcademicWorkspace() {
  return request('/academics')
}

export async function saveAcademicWorkspace(data) {
  return request('/academics', { method: 'PUT', body: JSON.stringify(data) })
}
