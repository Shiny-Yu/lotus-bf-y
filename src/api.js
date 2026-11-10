// Base URL of the LoTUS-BF backend. Empty = same origin (dev proxy / reverse proxy).
// Set VITE_API_BASE (see .env.example) to point a static deployment at a backend.
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '')

export function apiUrl (path) {
  return `${API_BASE}${path}`
}
