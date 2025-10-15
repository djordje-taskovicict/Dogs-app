<template>
  <div>
    <div class="row-between mb-12">
      <h1 class="h1">{{ title }}</h1>
      <Pagination :page="page" :disabled="loading" @update:page="$emit('update:page', $event)" />
    </div>
    <p v-if="error" class="error mb-12">{{ error }}</p>
    <div class="grid cols-3 dog-grid">
      <DogCard v-for="img in items" :key="img.id" :image="img" @more="(id)=>$emit('open', id)"/>
    </div>
    <div v-if="loading" class="notice mt-16">Loading...</div>
  </div>
</template>

<script setup>
import DogCard from './DogCard.vue'
import Pagination from '@/components/Pagination.vue'
defineProps({
  title: { type:String, default:'Rase pasa' },
  items: { type:Array, required:true },
  page: { type:Number, required:true },
  loading: { type:Boolean, default:false },
  error: { type:String, default:'' }
})
defineEmits(['update:page','open'])
</script>