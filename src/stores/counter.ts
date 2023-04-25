import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'

export const useFirebaseUser = defineStore('firebaseUser', () => {
  const firebaseUser: Ref<null | User> = ref(null)
  function setUser(newUser: User) {
    firebaseUser.value = newUser
  }
  function getUser() {
    return firebaseUser.value
  }
  return { firebaseUser, setUser, getUser }
})

interface CartItem {
  id: string
  kind: string
  price: number
  quantity: number
  src: string
}

export const useCart = defineStore('cart', () => {
  const cart: Ref<CartItem[]> = ref([])
  function addToCart(item: CartItem) {
    cart.value.push(item)
  }
  function removeFromCart(index: number) {
    cart.value.splice(index, 1)
  }
  function getCart() {
    return cart.value
  }
  return { cart, addToCart, removeFromCart, getCart }
})
