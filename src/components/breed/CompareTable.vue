<template>
  <div class="mt-16" v-if="items?.length===2">
    <div  style="overflow:auto;">
      <table class="compare-table" style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left; padding:8px; border-bottom:1px solid var(--border);">Image:</th>
            <th v-for="d in items" :key="d.breed.id" style="text-align:left; padding:8px; border-bottom:1px solid var(--border);">
              <div class="row">
                <img v-if="d.image?.url" :src="d.image.url" :alt="d.breed.name" class="round-8" style="width:64px;height:64px;object-fit:cover;">
                <div>
                  <div><strong>{{ d.breed.name }}</strong></div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.key">
            <td style="padding:8px; border-bottom:1px solid var(--border);"><strong>{{ row.label }}</strong></td>
            <td v-for="d in items" :key="d.breed.id + row.key" style="padding:8px; border-bottom:1px solid var(--border);">
              {{ row.get(d.breed) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type:Array, required:true } // [{breed, image}]
})
const rows = [
  { key:'group', label:'Group:', get: (b)=> b.breed_group || '—' },
  { key:'origin', label:'Origin:', get: (b)=> b.origin || 'unknown' },
  { key:'bred_for', label:'Bred for:', get: (b)=> b.bred_for || '—' },
  { key:'temperament', label:'Temperament:', get: (b)=> b.temperament || '—' },
  { key:'life_span', label:'Life span:', get: (b)=> b.life_span || '—' },
  { key:'height', label:'Height (cm):', get: (b)=> b.height?.metric || '—' },
  { key:'weight', label:'Weight (kg):', get: (b)=> b.weight?.metric || '—' },
]
</script>
