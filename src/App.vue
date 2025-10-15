<template>
  <div>
    <NavBar @logout="onLogout"/>
    <Page><router-view/></Page>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
import Page from '@/components/layout/Page.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore(), router = useRouter()
function onLogout(){ store.dispatch('logout'); router.push({ name:'login' }) }
</script>
