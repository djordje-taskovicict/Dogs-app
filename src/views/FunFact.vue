<template>
  <div class="fun-card-wrap">
    <FunCard v-if="data" :imageUrl="data.url" :breed="breed" />
    <div v-else-if="!loading" class="notice">Click “One more!” for a random dog breed.</div>
    <div class="row-between mb-12 btn-row">
      <h1 class="h1">Generate Random Fun Fact</h1>
      <button class="btn" @click="load" :disabled="loading">One more!</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <div v-if="loading" class="notice">Loading...</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchRandomBreedImage } from '@/api/dogApi'
import FunCard from '@/components/fun/FunCard.vue'
const data=ref(null), loading=ref(false), error=ref('')
const breed = computed(()=> data.value?.breeds?.[0] || null)
async function load(){ try{ loading.value=true; error.value=''; data.value=null; const res=await fetchRandomBreedImage(); data.value=res[0]||null }catch(e){ error.value=e.message||'Loading error...' }finally{ loading.value=false } }
onMounted(load)
</script>
