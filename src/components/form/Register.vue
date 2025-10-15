<template>
  <div class="auth">
    <section class="card-narrow">
      <div class="card-body">
        <h1 class="h1 mb-12">Registration</h1>

        <form @submit.prevent="onRegister" class="col" novalidate>
          <FormInput v-model="reg.username" label="Username" required />
          <small v-if="touched.username && usernameError" class="error">{{ usernameError }}</small>

          <FormInput v-model="reg.email" label="Email" type="email" required />
          <small v-if="touched.email && emailError" class="error">{{ emailError }}</small>

          <FormInput v-model="reg.password" label="Password" type="password" minlength="6" required />
          <small v-if="touched.password && passwordError" class="error">{{ passwordError }}</small>

          <button class="btn mt-14" :disabled="busy || !formValid">Register</button>
          <p v-if="registerError" class="error mt-8">{{ registerError }}</p>
        </form>

        <div class="switch mt-12">
          Already have an account?
          <RouterLink type="button" class="btn ghost" :to="{ name: 'login' }">Login</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import FormInput from '@/components/form/FormInput.vue'

const store = useStore()
const router = useRouter()

const busy = ref(false)
const registerError = ref('')
const reg = reactive({ username: '', email: '', password: '' })
const touched = reactive({ username: false, email: false, password: false })

onMounted(() => { store.dispatch('seedAdminIfMissing') })

// ----- Validacija -----
const usernameError = computed(() => {
  if (!reg.username) return 'Username is required'
  return reg.username.length >= 2 ? '' : 'Username must be at least 2 characters long'
})
const emailError = computed(() => {
  if (!reg.email) return 'Email is required'
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.email)
  return ok ? '' : 'Email is not valid'
})
const passwordError = computed(() => {
  if (!reg.password) return 'Password is required'
  return reg.password.length >= 6 ? '' : 'Password must be at least 6 characters long'
})
const formValid = computed(() => !usernameError.value && !emailError.value && !passwordError.value)

// označi polja kao dodirnuta
watch(() => reg.username, () => { touched.username = true })
watch(() => reg.email,    () => { touched.email    = true })
watch(() => reg.password, () => { touched.password = true })

async function onRegister(){
  touched.username = touched.email = touched.password = true
  if (!formValid.value) return
  try{
    busy.value = true; registerError.value=''
    await store.dispatch('register', { ...reg })
    router.push({ name: 'home' })
  }catch(e){
    registerError.value = e?.message || 'Registration error...'
  }finally{
    busy.value = false
  }
}

function goLogin(){ router.push({ name: 'login' }) }
</script>

<style scoped>
.card-narrow { max-width: 520px; margin: 48px auto; }
.switch { display:flex; gap:10px; align-items:center; }
.error { color: var(--error); font-size: 14px; }
</style>
