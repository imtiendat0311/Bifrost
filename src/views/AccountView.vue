<template>
  <div class="p-10 flex flex-col">
    <div class="flex flex-col w-full lg:flex-row gap-5">
      <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">Hi</div>
      <div class="grid flex-grow card bg-base-300 rounded-box place-items-center pt-5 pb-5 gap-5">
        <span class="font-bold">Your Recent Spending</span>
        <!-- <div class="card w-96 bg-primary text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn">EDIT</button>
              <button class="btn">MARK AS PRIMARY</button>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex gap-5 flex-col justify-center text-center pt-10">
      <h3 class="font-bold text-xl">Order History</h3>
      <div v-for="(itm, idx) in items" :key="idx">
        <div
          tabindex="0"
          class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
        >
          <div class="collapse-title text-xl font-medium">
            <div class="flex justify-between">
              <span>{{ 'Date: ' + itm.date }}</span>
              <span>{{ 'Total: ' + itm.total }}</span>
            </div>
          </div>
          <div class="collapse-content">
            <div class="flex w-full mt-5 mb-5 gap-5">
              <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div>
                  {{ itm.name }}
                </div>
                <div>
                  Shipping Address
                  {{ itm.address.line1 }}
                  {{ itm.address.line2 }}
                  {{ itm.address.city }}
                  {{ itm.address.state }}
                  {{ itm.address.postal_code }}
                  {{ itm.address.country }}
                </div>
              </div>
              <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div class="font-bold">PAYMENT METHOD</div>

                <div class="flex gap-3">
                  <font-awesome-icon
                    :icon="['fab', 'cc-' + itm.brand.toLowerCase()]"
                    class="text-2xl"
                  />{{ 'x-' + itm.last4 }}
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="table w-full">
                <!-- head -->
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="hover" v-for="(it, idex) in itm.item" :key="it.name">
                    <th>{{ idex + 1 }}</th>
                    <td>{{ it.name }}</td>
                    <td>{{ it.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { onBeforeMount, ref, type Ref } from 'vue'
const items: Ref<any[]> = ref([])
const db = getFirestore()
interface dbData {
  item: Array<{ name: string; quantity: number }>
  date: string
  total: number
  status: string
  name: string
  address: {
    line1: string
    line2: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  last4: string
  brand: string
}
onBeforeMount(async () => {
  const auth = getAuth()
  const user = auth.currentUser
  const qs = await getDocs(query(collection(db, 'orders'), where('userId', '==', user!.uid)))
  qs.forEach((doc) => {
    items.value.push({
      item: doc.data().item,
      date: doc.data().date,
      total: doc.data().total,
      status: doc.data().status,
      name: doc.data().name,
      address: doc.data().shipping.address,
      last4: doc.data().last4,
      brand: doc.data().brand
    })
  })
})
</script>
