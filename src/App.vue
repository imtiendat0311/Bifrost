<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { auth } from './firebase/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useFirebaseUser } from './stores/counter'
import { storeToRefs } from 'pinia'
import NavBar from './components/NavBar.vue'
import { onBeforeMount } from 'vue'
const userStore = useFirebaseUser()
const { firebaseUser } = storeToRefs(userStore)
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user logged in: ', user)
  } else {
    console.log('user logged out')
  }
  userStore.setUser(user as any)
})
onBeforeMount(() => {
  document.getElementsByTagName('body')[0].classList.add('dark:bg-zinc-800')
  document.getElementsByTagName('body')[0].classList.add('dark:text-white')
  document.getElementsByTagName('body')[0].classList.add('h-screen')

  document.getElementById('__nuxt')?.classList.add('dark:bg-zinc-800')
  if (localStorage.getItem('theme') === 'dark') {
    document.getElementsByTagName('html')[0].classList.add('dark')
  } else {
    document.getElementsByTagName('html')[0].classList.remove('dark')
  }
})
</script>

<template>
  <NavBar />
  <RouterView class="flex" />
</template>
