import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const Auth         = () => import('../views/Auth.vue')          
const Home         = () => import('../views/Home.vue')         
const BreedDetails = () => import('../views/BreedDetails.vue')  
const Search       = () => import('../views/Search.vue')
const Compare      = () => import('../views/Compare.vue')
const FunFact      = () => import('../views/FunFact.vue')      
const Admin        = () => import('../views/Admin.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // JAVNO (Auth wrapper koristi komponente Login/Register unutra)
    { path: '/',         name: 'login',    component: Auth, meta: { public: true } },
    { path: '/register', name: 'register', component: Auth, meta: { public: true } },

    // ZAŠTIĆENO
    { path: '/breeds',   name: 'home', component: Home }, // Home = breeds
    { path: '/breed/:imageId', name: 'breed-details', component: BreedDetails, props: true },
    { path: '/search',   name: 'search',  component: Search },
    { path: '/compare',  name: 'compare', component: Compare },

    // Fun fact (zamenjen komponentom FunFact.vue, ruta ostaje ista)
    { path: '/fun',      name: 'fun',     component: FunFact },

    // ADMIN (role guard)
    { path: '/admin',    name: 'admin', component: Admin, meta: { role: 'admin' } },

    // Fallback
    { path: '/:pathMatch(.*)*', redirect: { name: 'login' } }
  ],
})

// Global guard
router.beforeEach((to) => {
  const user = store.state.user
  const isPublic = to.meta?.public === true
  const requiredRole = to.meta?.role || null

  if (isPublic && user) return { name: 'home' }

  if (!isPublic && !user) return { name: 'login' }

  // Role guard
  if (requiredRole && user?.role !== requiredRole) return { name: 'home' }

  return true
})

export default router
