<template>
  <div>
    <h1 class="h1 mb-12">Search dog breeds:</h1>

    <div class="row mb-12">
      <input
        v-model="q"
        class="input"
        placeholder="Enter breed name (e.g. Jack Russell Terrier)"
        @input="onType"
      />
    </div>

    <SearchResults
      :results="results"
      :loading="loading"
      :error="error"
      :query="q"
      @open-details="goDetails"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchResults from '@/components/search/SearchResults.vue'

const router = useRouter()

const BASE = 'https://api.thedogapi.com/v1'
const KEY = import.meta.env.VITE_DOG_API_KEY
const headers = KEY ? { 'x-api-key': KEY } : {}

const q = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')
let timer

function onType () {
  clearTimeout(timer)
  timer = setTimeout(doSearch, 200) // debounce
}

async function doSearch () {
  const term = q.value.trim()
  if (!term) { results.value = []; return }
  try {
    loading.value = true
    error.value = ''
    const url = new URL(BASE + '/breeds/search')
    url.searchParams.set('q', term)
    url.searchParams.set('attach_image', '1')
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error('DogAPI error ' + res.status)
    results.value = await res.json()
  } catch (e) {
    error.value = e.message || 'Search error'
  } finally {
    loading.value = false
  }
}

function goDetails (imageId) {
  router.push({ name: 'breed-details', params: { imageId } })
}
</script>
