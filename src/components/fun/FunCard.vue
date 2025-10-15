<template>
  <div v-if="imageUrl && breed" class="card">
    <img :src="imageUrl" :alt="breed.name" size="lg" />
    <div class="card-body">
      <h2 class="h2 mb-8">{{ breed.name }}</h2>
      <ul style="margin:0; padding-left:18px;">
        <li><strong>Origin:</strong> {{ breed.origin || 'Unknown' }}</li>
        <li><strong>Group:</strong> {{ breed.breed_group || '—' }}</li>
        <li><strong>Bred for:</strong> {{ breed.bred_for || '—' }}</li>
        <li><strong>Temperament:</strong> {{ breed.temperament || '—' }}</li>
        <li><strong>Life span:</strong> {{ breed.life_span || '—' }}</li>
        <li><strong>Height (cm):</strong> {{ breed.height?.metric || '—' }}</li>
        <li><strong>Weight (kg):</strong> {{ breed.weight?.metric || '—' }}</li>
      </ul>
      <div class="notice mt-12"><strong>Did you know?</strong> <span>{{ funLine }}</span></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ imageUrl:String, breed:Object })
const funLine = computed(()=>{
  const b = props.breed || {}
  const parts = []
  if (b.bred_for) parts.push(`Originally bred for ${String(b.bred_for).toLowerCase()}.`)
  if (b.temperament) parts.push(`Temperament: ${b.temperament}.`)
  if (b.life_span) parts.push(`Typical life span is ${b.life_span}.`)
  return parts.join(' ')
})
</script>
