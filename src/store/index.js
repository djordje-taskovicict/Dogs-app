import { createStore } from 'vuex'

const STORAGE_USER  = 'dogapp_user'
const STORAGE_USERS = 'dogapp_users'
const STORAGE_ADMIN = 'dogapp_admin'

// helpers
function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) }
  catch { return fallback }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getDayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function getDayStartISO(d = new Date()) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.toISOString()
}

// ---- admin state loader ----
function loadAdmin() {
  const stored = loadJSON(STORAGE_ADMIN, {})
  const defaults = {
    featuredBreedIds: [],
    posts: [],
    tipsDaily: []
  }
  // spoj sa podrazumevanim i garantuj da je tipsDaily niz
  const merged = {
    ...defaults,
    ...stored,
    tipsDaily: Array.isArray(stored?.tipsDaily) ? stored.tipsDaily : []
  }
  // upiši nazad ako je nešto nedostajalo (jednokratna migracija)
  if (!stored || !Array.isArray(stored.tipsDaily)) {
    saveJSON(STORAGE_ADMIN, merged)
  }
  return merged
}

export default createStore({
  state: {
    user: loadJSON(STORAGE_USER, null),
    admin: loadAdmin()
  },

  getters: {
    currentDailyTip(state) {
      const dk = getDayKey()
      return (state.admin.tipsDaily || []).find(t => t.dayKey === dk) || null
    }
  },

  mutations: {
    // AUTH
    setUser(state, user) {
      state.user = user
      if (user) saveJSON(STORAGE_USER, user)
      else localStorage.removeItem(STORAGE_USER)
    },

    // DAILY TIP
    setDailyTip(state, tip) {
      if (!state.admin) state.admin = { featuredBreedIds: [], posts: [], tipsDaily: [] }
      if (!Array.isArray(state.admin.tipsDaily)) state.admin.tipsDaily = []
      const list = state.admin.tipsDaily
      const idx = list.findIndex(t => t.dayKey === tip.dayKey)
      if (idx >= 0) list.splice(idx, 1, tip)
      else list.unshift(tip)
      saveJSON(STORAGE_ADMIN, state.admin)
    },
    removeDailyTip(state, id) {
      if (!state.admin || !Array.isArray(state.admin.tipsDaily)) return
      state.admin.tipsDaily = state.admin.tipsDaily.filter(t => t.id !== id)
      saveJSON(STORAGE_ADMIN, state.admin)
    },

    // (opciono) ručna migracija
    migrateAdminState(state) {
      const fixed = loadAdmin()
      state.admin = fixed
    }
  },

  actions: {
    // AUTH
    login({ commit }, { email, password }) {
      const users = loadJSON(STORAGE_USERS, [])
      const found = users.find(u => u.email === email && u.password === password)
      if (!found) throw new Error('Pogrešan email ili lozinka')
      const { password: _omit, ...safe } = found
      commit('setUser', safe)
    },

    logout({ commit }) { commit('setUser', null) },

    register({ commit }, { username, email, password }) {
      const users = loadJSON(STORAGE_USERS, [])
      if (users.some(u => u.email === email)) throw new Error('Email je već registrovan')
      const newUser = { id: crypto.randomUUID(), username, email, password, role: 'user' }
      users.push(newUser)
      saveJSON(STORAGE_USERS, users)
      const { password: _omit, ...safe } = newUser
      commit('setUser', safe)
    },

    // seed samo ADMIN naloga
    seedAdminIfMissing() {
      const users = loadJSON(STORAGE_USERS, [])
      if (!users.some(u => u.role === 'admin')) {
        users.push({
          id: crypto.randomUUID(),
          username: 'Admin',
          email: 'admin@dogs.app',
          password: 'admin123',
          role: 'admin'
        })
        saveJSON(STORAGE_USERS, users)
      }
    },

    // DAILY TIP
    adminSetDailyTip({ commit }, { title, text, link }) {
      if (!title || !text) throw new Error('Naslov i tekst su obavezni')
      const tip = {
        id: crypto.randomUUID(),
        dayKey: getDayKey(),
        dayStartISO: getDayStartISO(),
        title,
        text,
        link: link || '',
        createdAt: new Date().toISOString()
      }
      commit('setDailyTip', tip)
    },
    adminRemoveDailyTip({ commit }, id) {
      commit('removeDailyTip', id)
    }
  }
})
