<template>
  <div class="flex gap-10 grow flex-row justify-center content-stretch">
    <div v-for="item in items" :key="item.key" class="flex">
      <ContainerComp
        :id="item.key"
        :kind="item.name"
        :src="item.img"
        :desc="item.desc"
        :is-new="item.new"
        :price="item.price"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import ContainerComp from '@/components/ContainerComp.vue'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { type Ref, ref, onBeforeMount, onBeforeUnmount } from 'vue'
const items: Ref<any[]> = ref([])
const db = getFirestore()
let unsub: () => void
onBeforeMount(() => {
  unsub = onSnapshot(collection(db, 'items'), (querySnapshot) => {
    items.value = []
    querySnapshot.forEach((doc) => {
      items.value.push({
        key: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        quantity: doc.data().quantity,
        img: doc.data().img,
        desc: doc.data().desc,
        new: doc.data().new
      })
    })
  })
})
onBeforeUnmount(() => {
  unsub()
})
</script>
