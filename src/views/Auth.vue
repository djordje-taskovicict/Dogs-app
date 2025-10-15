<template>
  <div class="auth">
    <section class="card card-narrow">
      <div class="card-body">
        <Login
          v-if="mode==='login'"
          :busy="busy"
          :error="loginError"
          @submit="onLogin"
          @switch="switchMode"
        />
        <Register
          v-else
          :busy="busy"
          :error="registerError"
          @submit="onRegister"
          @switch="switchMode"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Uvozimo KOMPONENTE (ne views): Login.vue i Register.vue
import Login from '@/components/form/Login.vue'
import Register from '@/components/form/Register.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const mode = ref('login')          // 'login' | 'register'
const busy = ref(false)
const loginError = ref('')
const registerError = ref('')

// inicijalni seed admin naloga
onMounted(() => {
  store.dispatch('seedAdminIfMissing')
  // Podrži rutu /register kao alias ka registraciji
  if (route.name === 'register' || route.query.mode === 'register') {
    mode.value = 'register'
  }
})

watch(() => route.name, (n) => {
  if (n === 'register') mode.value = 'register'
  if (n === 'login') mode.value = 'login'
})

function switchMode(next) {
  // next: 'login' | 'register'
  mode.value = next
  // sinhronizuj URL (opciono)
  if (next === 'register') router.replace({ name: 'register' })
  else router.replace({ name: 'login' })
}

async function onLogin(payload) {
  try {
    busy.value = true
    loginError.value = ''
    await store.dispatch('login', payload)   // { email, password }
    router.push({ name: 'home' })
  } catch (e) {
    loginError.value = e?.message || 'Login error...'
  } finally {
    busy.value = false
  }
}

async function onRegister(payload) {
  try {
    busy.value = true
    registerError.value = ''
    await store.dispatch('register', payload) // { username, email, password }
    router.push({ name: 'home' })
  } catch (e) {
    registerError.value = e?.message || 'Registration error...'
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.card-narrow { max-width: 520px; margin: 48px auto; }
</style>
