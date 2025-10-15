<template>
  <header class="nav">
    <!-- Levo: brend -->
    <RouterLink v-if="isLoggedIn" class="brand" :to="{ path: '/breeds' }">
      🐶 Dog breeds
    </RouterLink>

    <!-- Burger (mobilni) -->
<button
  v-if="isLoggedIn"
  class="burger fancy"
  :class="{ open: isOpen }"
  aria-label="Otvori meni"
  :aria-expanded="isOpen ? 'true' : 'false'"
  aria-controls="main-nav"
  @click="toggleMenu"
>
  <svg class="icon-burger" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path class="line top"    d="M4 7 H20"  />
    <path class="line middle" d="M4 12 H20" />
    <path class="line bottom" d="M4 17 H20" />
  </svg>
</button>


    <nav
      id="main-nav"
      class="nav-links"
      :class="{ open: isOpen }"
      v-if="isLoggedIn"
      @keyup.esc="closeMenu"
    >
      <RouterLink to="/breeds"  @click="closeMenu">Home</RouterLink>
      <RouterLink to="/search"  @click="closeMenu">Search</RouterLink>
      <RouterLink to="/compare" @click="closeMenu">Compare</RouterLink>
      <RouterLink to="/fun"     @click="closeMenu">Fun Fact</RouterLink>
      <RouterLink v-if="user?.role === 'admin'" to="/admin" @click="closeMenu">Admin</RouterLink>

      <div class="spacer"></div>
      <span class="user">👤 {{ user?.username }}</span>
      <button class="btn ghost" @click="onLogout">Log out</button>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const emit = defineEmits(['logout'])
const store = useStore()
const route = useRoute()

const user = computed(() => store.state.user)
const isLoggedIn = computed(() => !!store.state.user)

const isOpen = ref(false)
function toggleMenu(){ isOpen.value = !isOpen.value }
function closeMenu(){ isOpen.value = false }
function onLogout(){ closeMenu(); emit('logout') }

watch(() => route.fullPath, () => closeMenu())

function handleClickOutside(e){
  const header = document.querySelector('header.nav')
  if (header && !header.contains(e.target)) closeMenu()
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
