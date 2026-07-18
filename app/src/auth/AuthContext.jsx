import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Front-end-only mock auth. No real backend: the code step accepts ANY
 * non-empty code. Session is kept in sessionStorage so a refresh on /app
 * doesn't bounce you to login while testing.
 */
const AuthContext = createContext(null)
const KEY = 'hc.auth.user'

function seedUser(email, role) {
  return {
    name: 'Alex Johnson',
    company: 'Watchtower Homes',
    email: email || 'alex@watchtowerhomes.co',
    role: role || 'developer',
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) sessionStorage.setItem(KEY, JSON.stringify(user))
      else sessionStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }, [user])

  // Complete sign-in / sign-up once a (any) code is entered.
  const authenticate = useCallback((email, role) => {
    setUser(seedUser(email, role))
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({ user, isAuthed: !!user, authenticate, logout }),
    [user, authenticate, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
