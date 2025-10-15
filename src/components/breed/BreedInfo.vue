<template>
  <div class="grid cols-2 mt-16" style="align-items:start;">
    <img :src="imageUrl" :alt="breed?.name || 'Dog image'" class="w100 round-16 fit-cover" style="max-height:480px;" />
    <div>
      <h1 class="h1 mb-12">{{ breed?.name }}</h1>
      <p><strong>Origin:</strong> {{ breed?.origin || 'Unknown' }}</p>
      <p><strong>Group:</strong> {{ breed?.breed_group || '—' }}</p>
      <p><strong>Bred for:</strong> {{ breed?.bred_for || '—' }}</p>
      <p><strong>Temperament:</strong> {{ breed?.temperament || '—' }}</p>
      <p><strong>Life span:</strong> {{ breed?.life_span || '—' }}</p>
      <p><strong>Height (cm):</strong> {{ breed?.height?.metric || '—' }}</p>
      <p><strong>Weight (kg):</strong> {{ breed?.weight?.metric || '—' }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  breed: { type:Object, required:true },
  imageUrl: { type:String, required:true }
})
</script>
