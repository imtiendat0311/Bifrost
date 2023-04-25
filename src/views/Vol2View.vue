<template>
  <div class="flex justify-center mb-10">
    <img
      class="rounded-xl w-3/12 h-1/12"
      src="https://scontent-ord5-2.xx.fbcdn.net/v/t1.6435-9/130907080_111660134129154_6675992756447715939_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=-5jUOL_2LwEAX-NCHJY&_nc_ht=scontent-ord5-2.xx&oh=00_AfDHQCGf3sMvKHtfp9sYzztxjYVD1hm3jm0ymuufKmw43Q&oe=645F79E2"
    />
  </div>
  <div class="flex gap-10 grow flex-row justify-center pb-10">
    <div v-for="item in items" :key="item.key" class="flex">
      <ContainerComp
        :id="item.key"
        :kind="item.name"
        :price="item.price"
        :src="item.img"
        :desc="item.desc"
        :is-new="item.new"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContainerComp from '@/components/ContainerComp.vue'
import { db } from '@/firebase/firebase'
import { collection, getDoc, doc, query, where, getDocs, documentId } from 'firebase/firestore'
import { type Ref, ref, onBeforeMount, onBeforeUnmount } from 'vue'
const items: Ref<any[]> = ref([])

onBeforeMount(async () => {
  const docsnap = await getDoc(doc(db, 'collections', 'vol2'))
  if (docsnap.exists()) {
    console.log('Document data:', docsnap.data())
    const id: string[] = []
    docsnap.data().item.forEach((items: string) => {
      id.push(items)
    })
    if (id.length != null) {
      const q = query(collection(db, 'items'), where(documentId(), 'in', id))
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
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
        console.log(items.value)
      })
    }
  }
})
onBeforeUnmount(() => {})
</script>
