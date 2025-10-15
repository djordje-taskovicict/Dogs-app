<template>
  <section>
    <div class="card-body">
      <h2 class="h2 mb-12">Tip of the day</h2>

      <form @submit.prevent="save" class="col mb-12">
        <label class="label">Title</label>
        <input class="input" v-model="form.title" required />

        <label class="label">Text</label>
        <textarea class="input" v-model="form.text" rows="3" required></textarea>

        <label class="label">Link (optional)</label>
        <input class="input" v-model="form.link" placeholder="https://..." />

        <div class="row mt-12">
          <button class="btn" :disabled="busy">Save tip of the day</button>
          <button class="btn ghost" type="button" @click="clear" :disabled="busy || !current">Remove tip</button>
        </div>

        <p v-if="error" class="error mt-8">{{ error }}</p>
      </form>

      <div v-if="current" class="notice">
        <strong>Active tip:</strong> {{ current.title }} — {{ current.text }}
        <a v-if="current.link" :href="current.link" target="_blank" rel="noopener">→ link</a>
        <div class="muted mt-8">Valid from: {{ formatDate(current.dayStartISO) }}</div>
      </div>
      <div v-else class="muted">No tip set for today.</div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const current = computed(() => store.getters.currentDailyTip)
const form = reactive({ title: '', text: '', link: '' })
const busy = ref(false)
const error = ref('')

watch(current, (c) => {
  form.title = c?.title || ''
  form.text  = c?.text  || ''
  form.link  = c?.link  || ''
}, { immediate: true })

async function save() {
  try { busy.value = true; error.value = ''; await store.dispatch('adminSetDailyTip', { ...form }) }
  catch (e) { error.value = e.message || 'Greška pri snimanju' }
  finally { busy.value = false }
}
function clear() {
  if (!current.value) return
  store.dispatch('adminRemoveDailyTip', current.value.id)
  form.title = ''; form.text = ''; form.link = ''
}
function formatDate(iso) { try { return new Date(iso).toLocaleString() } catch { return iso } }
</script>
