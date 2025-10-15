<template>
  <div>
    <!-- SAVET DANA -->
    <div v-if="dailyTip" class="card mb-16">
      <div class="card-body">
        <h2 class="h2 mb-8">Tip of the day: {{ dailyTip.title }}</h2>
        <p class="mb-8 tip-text">{{ dailyTip.text }}</p>
        <a v-if="dailyTip.link" :href="dailyTip.link" target="_blank" rel="noopener">→ Read more</a>
      </div>
    </div>

    <!-- STANDARD GRID SA PAGINACIJOM -->
    <DogGrid
      title="Dog breeds"
      :items="items"
      :page="page"
      :loading="loading"
      :error="error"
      @update:page="onPageChange"
      @open="goDetails"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { fetchBreedImages, searchImagesByBreedIds } from '@/api/dogApi'
import DogCard from '@/components/breed/DogCard.vue'
import DogGrid from '@/components/breed/DogGrid.vue'

const store = useStore()
const router = useRouter()

// Savet dana
const dailyTip = computed(() => store.getters.currentDailyTip)

// Featured (opciono)
const featured = ref([])

// Grid state
const page = ref(0)
const loading = ref(false)
const error = ref('')
const items = ref([])

async function loadGrid () {
  try {
    loading.value = true
    error.value = ''
    items.value = await fetchBreedImages(page.value, 24)
  } catch (e) {
    error.value = e.message || 'Loading error'
  } finally {
    loading.value = false
  }
}

async function loadFeatured () {
  const ids = store.state.admin?.featuredBreedIds || []
  if (!ids.length) { featured.value = []; return }
  try {
    featured.value = await searchImagesByBreedIds(ids, 1)
  } catch {
    featured.value = []
  }
}

function onPageChange (p) {
  if (p < 0) return
  page.value = p
  loadGrid()
}

function goDetails (imageId) {
  router.push({ name: 'breed-details', params: { imageId } })
}

onMounted(() => { loadFeatured(); loadGrid() })
watch(() => store.state.admin?.featuredBreedIds, loadFeatured)
</script>
