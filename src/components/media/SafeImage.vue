<template>
  <div class="safe-img">
    <img :src="src" :alt="alt" class="safe-img__img" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src:  { type: String, required: true },
  alt:  { type: String, default: '' },
  size: { type: String, default: 'md' },      
  fit:  { type: String, default: 'cover' },     
  rounded: { type: Boolean, default: true }
})
const fitClass = computed(() => props.fit === 'contain' ? 'fit-contain' : 'fit-cover')
const bgStyle = computed(() => ({ '--bg': `url("${props.src}")` }))
</script>
