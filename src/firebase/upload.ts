import { ref } from '@firebase/storage'
import { storage } from './firebase'
import { uploadBytes, getDownloadURL } from 'firebase/storage'

export const uploadImg = async (file: File, fullPath: string) => {
  const storageRef = ref(storage, fullPath)
  const snap = await uploadBytes(storageRef, file).catch((error) => {
    console.log(error)
  })
  if (snap != null) {
    const url = await getDownloadURL(snap.ref)
    console.log(url)
    return url
  }
  return null
}
