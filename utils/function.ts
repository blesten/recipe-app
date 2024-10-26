import { db } from '@/config/firebaseConfig'
import * as SecureStore from 'expo-secure-store'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
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
  try {
    const getChefProfileQuery = query(collection(db, 'ChefProfile'), where('user_id', '==', userId))
    const getChefProfileQuerySnapshot = await getDocs(getChefProfileQuery)

    const chefProfileDoc = getChefProfileQuerySnapshot.docs[0]

    return {
      data: { id: chefProfileDoc?.id, ...chefProfileDoc.data() }
    }
  } catch (err: any) {
    console.log(err)
  }
}

export const getMasterIngredients = async() => {
  let masterIngredients: any[] = []

  const ingredientsQuery = query(collection(db, 'Ingredient'))
  const ingredientsQuerySnapshot = await getDocs(ingredientsQuery)
  
  ingredientsQuerySnapshot.forEach(doc => {
    masterIngredients = [...masterIngredients, { value: doc?.data().title, label: doc?.data().title, icon: doc?.data().icon }]
  })

  return masterIngredients
}

export const getIngredientByTitle = async(id: string) => {
  const ingredientQuery = query(collection(db, 'Ingredient'), where('title', '==', id))
  const ingredientQuerySnapshot = await getDocs(ingredientQuery)
  
  const ingredientDoc = ingredientQuerySnapshot.docs[0]

  return ingredientDoc.data()
}

export const getDishById = async(id: string) => {
  const dishRef = doc(db, 'Dish', id)
  const dishSnapshot = await getDoc(dishRef)

  if (!dishSnapshot.exists()) {
    return null
  }

  return {
    id: dishSnapshot.id,
    ...dishSnapshot.data()
  }
}

export const getCheftById = async(id: string) => {
  const chefRef = doc(db, 'ChefProfile', id)
  const chefSnapshot = await getDoc(chefRef)

  if (!chefSnapshot.exists()) {
    return null
  }

  return {
    id: chefSnapshot.id,
    ...chefSnapshot.data()
  }
}

export const getDishSavedStatus = async(userId: string, dishId: string) => {
  const statusQuery = query(collection(db, 'Saved'), where('dishId', '==', dishId), where('userId', '==', userId))
  const statusQuerySnapshot = await getDocs(statusQuery)

  const statusDocs = statusQuerySnapshot.docs[0]

  if (statusDocs.exists()) {
    return true
  }

  return false
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

export const getGreeting = () => {
  const currentHour = new Date().getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning'
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon'
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening'
  } else {
    return 'Good Night'
  }
}