<template>
  <!-- <div
    class="flex flex-col justify-center content-center bg-zinc-100 text-neutral-50 rounded-md p-5"
  >
    <nuxt-img :src="`/${src}`" class="rounded-md w-72 h-72" />
     {{ kind }}<br />
    {{ price }}
  </div> -->
  <div class="card w-96 bg-base-100 shadow-xl dark:bg-black text-black dark:text-white">
    <figure><img :src="src" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ kind }}
        <div v-if="isNew" class="badge badge-secondary">NEW</div>
      </h2>
      <p class="">{{ desc }}</p>
      <p class="font-bold">{{ price + ' VND' }}</p>
      <div class="flex gap-5 flex-grow justify-center pt-10 pb-10">
        <form action="http://localhost:3000/api/checkout" method="POST">
          <input
            type="hidden"
            name="cart"
            :value="JSON.stringify([{ id, kind, price, src, desc, quantity: 1 }])"
          />
          <input type="hidden" name="price" :value="price" />
          <input type="hidden" name="desc" :value="desc" />
          <input type="hidden" name="quantity" value="1" />
          <input type="hidden" name="pid" :value="id" />
          <input type="hidden" name="img" :value="src" />
          <input
            type="hidden"
            name="uid"
            :value="firebaseUser === null ? null : firebaseUser.uid"
          />
          <button class="btn bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800">
            Buy Now
          </button>
        </form>
        <button
          class="btn bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800"
          @click="addCart({ id, kind, price, src, desc, quantity: 1 })"
        >
          Add To Cart
        </button>
      </div>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div>
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCart } from '../stores/counter'
import { useFirebaseUser } from '../stores/counter'
import { storeToRefs } from 'pinia'
const storeCart = useCart()
const { cart } = storeToRefs(storeCart)
const storeFb = useFirebaseUser()
const { firebaseUser } = storeToRefs(storeFb)
defineProps({
  id: {
    type: String,
    required: true
  },
  kind: {
    type: String,
    default: 'default',
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  }
})
function addCart(item: any) {
  if (cart.value.length === 0) {
    cart.value.push(item)
  } else {
    let check = true
    cart.value.forEach((element: any) => {
      if (element.id === item.id) {
        element.quantity += 1
        check = false
      }
    })
    if (check) {
      cart.value.push(item)
    }
  }
  console.log(cart.value)
}
// async function buyNow() {
//   await $fetch("/api/checkout", {
//     method: "POST",
//     body: JSON.stringify({
//       name: props.kind,
//       price: props.price,
//       desc: props.desc,
//       quantity: 1,
//       pid: props.id,
//     }),
//   });
// }
</script>
