<template>
  <div class="admin-panel-wrap">
    <h1 class="h1 mb-12">Admin panel</h1>
    <section class="card mt-16">
      <DailyTipM />
    </section>
    <AdminTools />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AdminTools from '@/components/admin/AdminTools.vue'
import DailyTipM from '@/components/admin/DailyTipM.vue'

const store = useStore()
const user = computed(() => store.state.user)
</script>
