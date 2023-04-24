<template>
  <div class="grid grid-cols-3 justify-between pl-16 pr-16 pb-10 pt-10">
    <div class="flex items-center">
      <RouterLink to="/shop">
        <button
          class="btn btn-ghost hover:bg-black hover:text-white dark:hover:bg-black text-black dark:text-white"
        >
          Shop
        </button></RouterLink
      >
      <!-- <button
        class="btn btn-ghost hover:bg-black hover:text-white dark:hover:bg-black text-black dark:text-white"
      >
        Search
      </button> -->
    </div>
    <div class="flex justify-self-stretch justify-center">
      <RouterLink to="/" class="text-5xl font-bold text-black dark:text-white">BIFROST</RouterLink>
    </div>
    <div class="flex justify-end items-center gap-12">
      <div class="dropdown dropdown-end">
        <div class="indicator">
          <span
            v-if="cart.length > 0"
            class="indicator-item badge bg-red-600 border-red-600"
          ></span>
          <label
            tabindex="0"
            class="btn btn-ghost hover:bg-black hover:text-white dark:hover:bg-black text-black dark:text-white"
            >Bag</label
          >
        </div>
        <div
          tabindex="0"
          class="dropdown-content card card-compact p-2 shadow bg-white text-black w-80"
        >
          <div class="card-body flex">
            <h3 class="card-title text-black dark:text-white">Your Cart</h3>
            <p v-if="cart.length === 0">This Cart is Empty</p>
            <div
              v-for="(item, idx) in cart"
              v-else
              :key="item.id"
              class="flex gap-5 align-baseline"
            >
              <img :src="item.src" class="w-10 h-10" />
              {{ item.kind }}
              <button class="btn bg-black text-white" @click="item.quantity++">+</button>
              <span>{{ item.quantity }}</span>
              <button
                class="btn bg-black text-white"
                @click="item.quantity == 1 ? storeCart.removeFromCart(idx) : item.quantity--"
              >
                -
              </button>
            </div>
            <form action="http://localhost:3000/api/checkout" method="POST">
              <input type="hidden" name="cart" :value="JSON.stringify(cart)" />
              <input type="hidden" name="multiple" :value="true" />
              <input
                type="hidden"
                name="uid"
                :value="firebaseUser === null ? null : firebaseUser.uid"
              />
              <button class="btn bg-black text-white">Checkout</button>
            </form>
          </div>
        </div>
      </div>

      <div v-if="firebaseUser != null" class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="btn m-1 btn-ghost hover:bg-black hover:text-white dark:hover:bg-black"
          >Account</label
        >
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-white rounded-box text-black dark:bg-black dark:text-white w-60"
        >
          <li>
            <a class="font-bold" @click="toAccount">VISIT YOUR ACCOUNT</a>
          </li>
          <li><a class="font-bold" @click="Logout">LOGOUT</a></li>
        </ul>
      </div>
      <div v-else class="dropdown dropdown-end">
        <label
          tabindex="0"
          class="btn m-1 btn-ghost hover:bg-black hover:text-white dark:hover:bg-black"
          >Login</label
        >
        <div
          tabindex="0"
          class="dropdown-content card card-compact w-64 p-2 shadow bg-white text-black dark:bg-black dark:text-white"
        >
          <div class="card-body">
            <h3 class="card-title font-bold">
              {{ isReg ? 'REGISTER' : 'LOGIN' }}
            </h3>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="emailText"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="passwordText"
                type="password"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div v-if="isReg" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Confirme Password</span>
              </label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div v-if="isReg" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input
                v-model="firstName"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div v-if="isReg" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              class="btn bg-black text-white mt-5 dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
              @click="isReg ? (isReg = false) : Login()"
            >
              Login
            </button>
            <button
              class="btn bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
              @click="isReg ? register() : (isReg = true)"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCart } from '../stores/counter'
import { useFirebaseUser } from '../stores/counter'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '@/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
const emailText = ref('')
const passwordText = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const isReg = ref(false)
const userStore = useFirebaseUser()
const storeCart = useCart()
const { firebaseUser } = storeToRefs(userStore)
const { cart } = storeToRefs(storeCart)
async function register() {
  await createUserWithEmailAndPassword(auth, emailText.value, passwordText.value).then(
    (userCredential) => {
      // Signed in
      const user = userCredential.user
      setDoc(doc(db, 'users', user.uid), {
        email: emailText.value,
        firstName: firstName.value,
        lastName: lastName.value,
        kind: 1
      })
      emailText.value = ''
      passwordText.value = ''
      confirmPassword.value = ''
      firstName.value = ''
      lastName.value = ''
      isReg.value = false
    }
  )
}
function toAccount() {
  if (firebaseUser.value?.email !== 'dat@gmail.com') {
    router.push('/account')
  } else {
    router.push('/admin')
  }
}
function Login() {
  signInWithEmailAndPassword(auth, emailText.value, passwordText.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      emailText.value = ''
      passwordText.value = ''
      // ...
    })
    .catch((error) => {})
}
function Logout() {
  signOut(auth)
  router.push('/')
}
</script>
