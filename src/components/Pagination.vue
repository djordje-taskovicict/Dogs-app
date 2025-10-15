<template>
  <div class="row">
    <button class="btn ghost" :disabled="page<=0 || disabled" @click="$emit('update:page', page-1)">Previous page</button>
    <span class="muted">Page: {{ page+1 }}</span>
    <button class="btn ghost" :disabled="disabled" @click="$emit('update:page', page+1)">Next page</button>
  </div>
</template>

<script setup>
defineProps({
  page: { type: Number, required: true },
  disabled: { type: Boolean, default: false }
})
defineEmits(['update:page'])
</script>
