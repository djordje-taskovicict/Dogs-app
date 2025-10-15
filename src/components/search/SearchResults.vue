<template>
  <div>
    <p v-if="error" class="error mb-12">{{ error }}</p>
    <p v-if="!loading && results.length===0 && query?.length>=1" class="muted mb-12">No results for "{{ query }}".</p>

    <div class="grid cols-3">
      <article v-for="b in results" :key="b.id" class="card">
        <img v-if="b.image?.url" :src="b.image.url" :alt="b.name" class="w100 h220 fit-cover safe-img lg" />
        <div class="card-body">
          <h2 class="h2">{{ b.name }}</h2>
          <p><strong>Origin:</strong> {{ b.origin || 'Unknown' }}</p>
          <div class="mt-8">
            <p><strong>Group:</strong> {{ b.breed_group || '—' }}</p>
            <p><strong>Bred for:</strong> {{ b.bred_for || '—' }}</p>
            <p><strong>Temperament:</strong> {{ b.temperament || '—' }}</p>
            <p><strong>Life span:</strong> {{ b.life_span || '—' }}</p>
            <p><strong>Height (cm):</strong> {{ b.height?.metric || '—' }}</p>
            <p><strong>Weight (kg):</strong> {{ b.weight?.metric || '—' }}</p>
          </div>
          <button v-if="b.reference_image_id" class="btn mt-12" @click="$emit('open-details', b.reference_image_id)">
            Open as detail page
          </button>
        </div>
      </article>
    </div>

    <div v-if="loading" class="notice mt-16">Loading...</div>
  </div>
</template>

<script setup>
defineProps({
  results: { type:Array, default:()=>[] },
  loading: { type:Boolean, default:false },
  error: { type:String, default:'' },
  query: { type:String, default:'' }
})
defineEmits(['open-details'])
</script>
