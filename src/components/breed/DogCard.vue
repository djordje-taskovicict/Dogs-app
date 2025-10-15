<template>
  <article class="card">
    <img :src="image.url" :alt="breed?.name || 'Dog image'" class="w100 h220 dog-card safe-img lg" />
    <div class="card-body">
      <h2 class="h2">{{ breed?.name || 'Unknown breed' }}</h2>
      <p class="muted">Origin: <strong>{{ breed?.origin || 'Unknown' }}</strong></p>
      <button class="btn mt-8" @click="$emit('more', image.id)">Learn more about this breed</button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ image: { type:Object, required:true } })
const breed = computed(() => props.image?.breeds?.[0])
defineEmits(['more'])
</script>
