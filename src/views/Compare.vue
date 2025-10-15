<template>
  <div>
    <h1 class="h1 mb-12">Compare 2 breeds</h1>
    <div class="notice mb-12">Choose 2 breeds to compare.</div>

    <div class="row mb-12" style="flex-wrap:wrap;">
      <div style="flex:1; min-width:260px;">
        <label class="label">Breed 1</label>
        <input class="input" v-model="q1" placeholder="Search..." @input="filter1" />
        <select class="select mt-8" v-model="id1" @change="loadDetails">
          <option value="">— Choose —</option>
          <option v-for="b in f1" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
      <div style="flex:1; min-width:260px;">
        <label class="label">Breed 2</label>
        <input class="input" v-model="q2" placeholder="Search..." @input="filter2" />
        <select class="select mt-8" v-model="id2" @change="loadDetails">
          <option value="">— Choose —</option>
          <option v-for="b in f2" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <div v-if="loading" class="notice">Loading...</div>
    <CompareTable :items="details" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchBreeds, fetchImageById } from '@/api/dogApi'
import CompareTable from '@/components/breed/CompareTable.vue'

const all=ref([]), f1=ref([]), f2=ref([]); const q1=ref(''), q2=ref(''); const id1=ref(''), id2=ref('')
const loading=ref(false), error=ref(''); const details=ref([])

function filter1(){ const t=q1.value.trim().toLowerCase(); f1.value=!t?all.value:all.value.filter(b=>b.name.toLowerCase().includes(t)) }
function filter2(){ const t=q2.value.trim().toLowerCase(); f2.value=!t?all.value:all.value.filter(b=>b.name.toLowerCase().includes(t)) }

async function loadDetails(){
  try{
    error.value=''; details.value=[]
    if(!id1.value || !id2.value || id1.value===id2.value) return
    loading.value=true
    const pick=id=>all.value.find(b=>String(b.id)===String(id))
    const b1=pick(id1.value), b2=pick(id2.value)
    const res=[]
    for(const b of [b1,b2]){
      const img = b.reference_image_id ? await fetchImageById(b.reference_image_id) : { url:'', id:String(b.id) }
      res.push({ breed:b, image:img })
    }
    details.value=res
  }catch(e){ error.value=e.message||'Loading error...' }finally{ loading.value=false }
}

onMounted(async ()=>{
  try{ loading.value=true; all.value=await fetchBreeds(); f1.value=all.value; f2.value=all.value }
  catch(e){ error.value=e.message||'Loading error...' }
  finally{ loading.value=false }
})
</script>
