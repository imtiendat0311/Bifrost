<template>
  <div class="flex flex-col w-full gap-5 pl-10 pr-10">
    <div class="flex flex-col w-full lg:flex-row gap-5">
      <div
        class="grid flex-grow card rounded-box place-items-center shadow-lg text-black text-bold dark:text-white dark:bg-black"
      >
        {{ firebaseUser == null ? 'not logged in' : 'Hi  ' + name }}
      </div>

      <div
        v-if="firebaseUser == null"
        class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center text-black text-bold dark:text-white dark:bg-black"
      >
        not logged in
      </div>
      <div
        v-else
        class="grid flex-grow card place-items-center shadow-lg pb-10 gap-3 text-black text-bold dark:text-white dark:bg-black pt-10"
      >
        <span class="font-bold text-black dark:text-white">ADD ITEM</span>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text font-bold text-black dark:text-white">ITEM NAME</span>
          </label>
          <input
            v-model="itemName"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text font-bold text-black dark:text-white">ITEM DESCRIPTION</span>
          </label>
          <input
            v-model="itemDesc"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text font-bold dark:text-white text-black">PRICE</span>
          </label>
          <input
            v-model="itemPrice"
            type="number"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text font-bold dark:text-white text-black">QUANTITY </span>
          </label>
          <input
            v-model="itemQuantity"
            type="number"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
          />
        </div>
        <input
          type="file"
          class="file-input w-full max-w-xs file-input-ghost"
          @change="
            (e) => {
              if (e.target != null) {
                file = e.target.files[0]
              }
            }
          "
        />
        <button
          class="btn bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
          @click="addItem"
        >
          ADD ITEM
        </button>
      </div>
    </div>
    <div
      class="grid grid-flow-col card rounded-box gap-5 justify-center bg-transparent p-5 auto-cols-max auto-rows-max"
    >
      <div v-for="item in items" :key="item.key">
        <div class="card w-96 bg-white dark:bg-black shadow-xl">
          <figure>
            <img :src="item.img" :alt="item.name" />
          </figure>
          <div class="card-body">
            <div v-if="currentSelected == item.key && isEdit" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold text-black dark:text-white">ITEM NAME</span>
              </label>
              <input
                v-model="editName"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
              />
            </div>
            <h2 v-else class="card-title text-black dark:text-white font-bold">
              {{ 'Item : ' + item.name }}
            </h2>
            <div v-if="currentSelected == item.key && isEdit" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold text-black dark:text-white"
                  >ITEM DESCRIPTION</span
                >
              </label>
              <input
                v-model="editDesc"
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
              />
            </div>
            <p v-else class="text-black dark:text-white font-bold">
              {{ 'Description : ' + item.desc }}
            </p>
            <div v-if="currentSelected == item.key && isEdit" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold dark:text-white text-black">PRICE </span>
              </label>
              <input
                v-model="editPrice"
                type="number"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
              />
            </div>
            <p v-else class="text-black dark:text-white font-bold">
              {{ 'Price : ' + (item.price / 1000).toFixed(3) + ' VND' }}
            </p>
            <div v-if="currentSelected == item.key && isEdit" class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text font-bold dark:text-white text-black">QUANTITY </span>
              </label>
              <input
                v-model="editQuantity"
                type="number"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs dark:bg-zinc-800 dark:text-white bg-white text-black"
              />
            </div>
            <p v-else class="text-black dark:text-white font-bold">
              {{ 'Quantity : ' + item.quantity }}
            </p>
            <div class="card-actions justify-end">
              <button
                class="btn bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                @click="editItem(item)"
              >
                {{ isEdit ? 'DONE' : 'EDIT' }}
              </button>
              <button
                v-if="isEdit"
                class="btn bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                @click="isEdit = false"
              >
                CANCEL
              </button>
              <button
                v-else
                class="btn bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-800 dark:hover:text-white"
                @click="deleteItem(item)"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { auth, storage } from '@/firebase/firebase'
import { useFirebaseUser } from '@/stores/counter'
import {
  // DocumentData,
  // QuerySnapshot,
  collection,
  getDoc,
  doc,
  // getDocs,
  getFirestore,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from 'vue'
// import { useFirebaseUser } from '../stores/counter'
import { storeToRefs } from 'pinia'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { uploadImg } from '@/firebase/upload'
const file = ref(null)
const items: Ref<any[]> = ref([])
const itemName = ref('')
const itemPrice = ref(0)
const itemQuantity = ref(0)
const itemDesc = ref('')
const name = ref('')
const fbStore = useFirebaseUser()
const { firebaseUser } = storeToRefs(fbStore)
const db = getFirestore()
const isEdit = ref(false)
const editName = ref('')
const editPrice = ref(0)
const editQuantity = ref(0)
const editDesc = ref('')
const currentSelected = ref('')
let unsub: any
onBeforeMount(async () => {
  if (firebaseUser.value != null) {
    const docSnap = await getDoc(doc(db, 'users', firebaseUser.value!.uid))
    if (docSnap.exists()) {
      name.value = docSnap.data().firstName + ' ' + docSnap.data().lastName
    } else {
      name.value = 'Admin'
    }
  }

  unsub = onSnapshot(collection(db, 'items'), (querySnapshot) => {
    items.value = []
    querySnapshot.forEach((doc) => {
      items.value.push({
        key: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        quantity: doc.data().quantity,
        img: doc.data().img,
        desc: doc.data().desc
      })
    })
  })
})
async function addItem() {
  if (
    itemName.value !== '' &&
    itemPrice.value !== 0 &&
    itemQuantity.value !== 0 &&
    file.value !== null
  ) {
    const db = getFirestore()

    const url = await uploadImg(file.value, 'img/' + file.value.name)
    if (url != null) {
      const newItem = {
        name: itemName.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        img: url,
        desc: itemDesc.value
      }
      addDoc(collection(db, 'items'), newItem)
        .then(() => {
          console.log('Document successfully written!')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
        })
    }
  }
}

async function editItem(item: any) {
  if (!isEdit.value) {
    currentSelected.value = item.key
    editName.value = item.name
    editDesc.value = item.desc
    editQuantity.value = item.quantity
    editPrice.value = item.price
  } else {
    await updateDoc(doc(db, 'items', item.key), {
      name: editName.value,
      desc: editDesc.value,
      quantity: editQuantity.value,
      price: editPrice.value
    })
  }
  console.log(item)
  isEdit.value = !isEdit.value
}
async function deleteItem(item: any) {
  await deleteDoc(doc(db, 'items', item.key))
}
onBeforeUnmount(() => {
  unsub()
})
</script>
