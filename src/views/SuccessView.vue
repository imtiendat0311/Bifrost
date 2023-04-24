<template>
  <div class="card flex bg-white dark:bg-black dark:text-white text-black shadow-xl mr-10 ml-10">
    <div class="card-body">
      <h2 class="card-title text-2xl">ORDER CONFIRMATION</h2>
      <div class="grid grid-flow-col">
        <div class="flex flex-col">
          <span class="font-bold">DATE PLACED</span> {{ data.date }}
          <span class="font-bold">Order Total {{ '  ' + data.total }}</span>

          <span class="font-bold">PAYMENT METHOD</span>
          <div class="flex gap-2">
            <font-awesome-icon
              :icon="['fab', 'cc-' + data.brand.toLowerCase()]"
              class="text-2xl"
            ></font-awesome-icon>
            {{ 'x-' + data.last4 }}
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold">Shipping Address</h3>
          <p>{{ data.shipping.address.name }}</p>
          <p>{{ data.shipping.address.line1 }}</p>
          <p v-if="data.shipping.address.line2 != null">
            {{ data.shipping.address.line2 }}
          </p>
          <p>
            {{ data.shipping.address.city }}, {{ data.shipping.address.state }},{{
              ' ' + data.shipping.address.postal_code
            }}
          </p>
          <p>{{ data.shipping.address.country }}</p>
        </div>
      </div>
      <div class="overflow-x-auto flex">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>ITEM</th>
              <th>DESCRIPTION</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(itm, idx) in items" :key="idx" class="hover">
              <td><img :src="itm.img" class="w-20" /></td>
              <td>{{ itm.name }}</td>
              <td>{{ itm.quantity }}</td>
              <td>{{ itm.price }}</td>
            </tr>
            <!-- row 3 -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { type Ref, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data: Ref<any> = ref({
  date: '',
  total: '',
  last4: '',
  brand: '',
  shipping: {
    address: {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    }
  },
  item: {
    array: []
  }
})
const items: Ref<any[]> = ref([])

const db = getFirestore()
console.log(route.query.session_id)
onBeforeMount(async () => {
  const docSnap = await getDoc(doc(db, 'orders', route.query.session_id!.toString()))
  if (docSnap.exists()) {
    data.value = docSnap.data()
    data.value.item.forEach(async (element: any) => {
      const qs = await getDocs(query(collection(db, 'items'), where('name', '==', element.name)))
      console.log(qs)
      qs.forEach(async (document) => {
        console.log(document.data())
        items.value.push({
          name: document.data().name,
          price: document.data().price,
          img: document.data().img,
          quantity: element.quantity
        })
        await updateDoc(doc(db, 'items', document.id), {
          quantity: document.data().quantity - element.quantity
        })
      })
    })
  } else {
    console.log('no data')
  }
  console.log(items.value)
  if (getAuth().currentUser != null) {
    await updateDoc(doc(db, 'orders', route.query.session_id!.toString()), {
      userId: getAuth().currentUser!.uid
    })
  }
})
</script>
