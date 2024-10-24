import { db } from '@/config/firebaseConfig'
import * as SecureStore from 'expo-secure-store'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_DISH_PRESET, CLOUDINARY_USER_PRESET } from './constant'

export const getUserData = async() => {
  try {
    const email = await SecureStore.getItemAsync('isAuth')

    const getUserQuery = query(collection(db, 'User'), where('email', '==', email))
    const getUserQuerySnapshot = await getDocs(getUserQuery)

    const userDoc = getUserQuerySnapshot.docs[0]

    return {
      data: { id: userDoc?.id, ...userDoc.data() }
    }
  } catch (err: any) {
    console.log(err)
  }
}

export const getChefProfileData = async(userId: string) => {
  const getChefProfileQuery = query(collection(db, 'ChefProfile'), where('user_id', '==', userId))
  const getChefProfileQuerySnapshot = await getDocs(getChefProfileQuery)

  const chefProfileDoc = getChefProfileQuerySnapshot.docs[0]

  return {
    data: { id: chefProfileDoc?.id, ...chefProfileDoc.data() }
  }
}

export const uploadImage = async(fileUri: string, type: string) => {
  const formData = new FormData()

  const file = {
    uri: fileUri,
    type: 'image/jpeg',
    name: `photo_${type.toLowerCase()}_${Date.now()}.jpg`
  }
  
  // @ts-ignore
  formData.append('file', file)
  
  if (type === 'User') {
    formData.append('upload_preset', `${CLOUDINARY_USER_PRESET}`)
  } else {
    formData.append('upload_preset', `${CLOUDINARY_DISH_PRESET}`)
  }

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const data = await res.json()
    
    return data.secure_url
  } catch (err) {
    console.log('Error uploading image: ', err)
    return null
  }
}