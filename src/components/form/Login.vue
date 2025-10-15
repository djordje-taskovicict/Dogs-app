<template>
  <div>
    <h1 class="h1 mb-12">Login</h1>

    <form @submit.prevent="emitSubmit" class="col" novalidate>
      <FormInput
        v-model="form.email"
        label="Email"
        type="email"
        required
        autocomplete="email"
        @blur="touched.email = true"
      />
      <small v-if="touched.email && emailError" class="error">{{ emailError }}</small>

      <FormInput
        v-model="form.password"
        label="Lozinka"
        type="password"
        required
        autocomplete="current-password"
        @blur="touched.password = true"
      />
      <small v-if="touched.password && passwordError" class="error">{{ passwordError }}</small>

      <button class="btn mt-14" :disabled="busy || !formValid">Login</button>
      <p v-if="error" class="error mt-8">{{ error }}</p>
    </form>

    <div class="switch mt-12">
      Don't have an account?
      <RouterLink class="btn ghost" type="button" :to="{ name: 'register' }">Register</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import FormInput from '@/components/form/FormInput.vue'

const props = defineProps({
  busy: { type: Boolean, default: false },
  error: { type: String, default: '' }
})
const emit = defineEmits(['submit','switch'])

const form = reactive({ email: '', password: '' })
const touched = reactive({ email: false, password: false })

const emailError = computed(() => {
  if (!form.email) return 'Email is required'
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  return ok ? '' : 'Email is not valid'
})
const passwordError = computed(() => {
  if (!form.password) return 'Password is required'
  return form.password.length >= 6 ? '' : 'Password must be at least 6 characters long'
})
const formValid = computed(() => !emailError.value && !passwordError.value)

watch(() => form.email, () => { touched.email = true })
watch(() => form.password, () => { touched.password = true })

function emitSubmit(){
  touched.email = true; touched.password = true
  if (!formValid.value) return
  emit('submit', { ...form })
}
</script>

<style scoped>
.switch { display:flex; gap:10px; align-items:center; }
.error { color: var(--error); font-size: 14px; }
</style>
