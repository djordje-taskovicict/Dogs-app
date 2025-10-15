<template>
  <div v-if="data">
    <button class="btn ghost" @click="$router.back()">← Back</button>
    <BreedInfo :breed="breed" :imageUrl="data.url" />
  </div>
  <div v-else><p v-if="error" class="error">{{ error }}</p><div v-else class="notice">Loading...</div></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchImageById } from '@/api/dogApi'
import BreedInfo from '@/components/breed/BreedInfo.vue'

const route = useRoute()
const data = ref(null); const error = ref('')
const breed = computed(()=> data.value?.breeds?.[0])

async function load(){ try{ error.value=''; data.value=await fetchImageById(route.params.imageId) }catch(e){ error.value=e.message||'Error loading details...' } }
onMounted(load)
</script>
