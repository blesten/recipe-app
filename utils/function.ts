import { db } from '@/config/firebaseConfig'
import * as SecureStore from 'expo-secure-store'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_DISH_PRESET, CLOUDINARY_USER_PRESET } from './constant'

interface SavedDish {
  id: string
  userId: string
  dishId: string
}

interface Dish {
  id: string
  name: string
}

interface PopulatedSavedDish extends SavedDish {
  dishData: Dish | null
}

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

export const getChefDishes = async(chefId: string) => {
  let dishes: any[] = []

  const dishesQuery = query(collection(db, 'Dish'), where('chefId', '==', chefId))
  const dishesQuerySnapshot = await getDocs(dishesQuery)

  dishesQuerySnapshot.forEach(doc => {
    dishes = [...dishes, { id: doc.id, ...doc.data() }]
  })

  return dishes
}

export const getSavedDish = async(userId: string) => {
  try {
    const savedDishQuery = query(collection(db, 'Saved'), where('userId', '==', userId))
    const savedDishSnapshot = await getDocs(savedDishQuery)

    const savedDishes: SavedDish[] = []

    savedDishSnapshot.forEach(doc => {
      const savedDishData: SavedDish = { id: doc.id, ...doc.data() } as SavedDish
      savedDishes.push(savedDishData)
    })

    const dishIds = savedDishes.map(dish => dish.dishId)

    if (dishIds.length === 0) {
      return savedDishes.map(dish => ({ ...dish, dishData: null }))
    }

    const dishQuery = query(collection(db, 'Dish'), where('__name__', 'in', dishIds))
    const dishSnapshot = await getDocs(dishQuery)

    const dishMap: Record<string, Dish> = {}
    dishSnapshot.forEach(doc => {
      dishMap[doc.id] = { ...doc.data() } as Dish
    })

    const populatedDishes: PopulatedSavedDish[] = savedDishes.map(savedDish => ({
      ...savedDish,
      dishData: dishMap[savedDish.dishId] || null
    }))

    return populatedDishes
  } catch (err: any) {
    console.log(err)
  }
}

export const getCompletedDish = async(userId: string) => {
  const completedDishQuery = query(collection(db, 'Completed'), where('userId', '==', userId))
  const completedDishSnapshot = await getDocs(completedDishQuery)

  const completedDishes: SavedDish[] = []

  completedDishSnapshot.forEach(doc => {
    const completedDishData: SavedDish = { id: doc.id, ...doc.data() } as SavedDish
    completedDishes.push(completedDishData)
  })

  const dishIds = completedDishes.map(dish => dish.dishId)

  if (dishIds.length === 0) {
    return completedDishes.map(dish => ({ ...dish, dishData: null }))
  }

  const dishQuery = query(collection(db, 'Dish'), where('__name__', 'in', dishIds))
  const dishSnapshot = await getDocs(dishQuery)

  const dishMap: Record<string, Dish> = {}
  dishSnapshot.forEach(doc => {
    dishMap[doc.id] = { ...doc.data() } as Dish
  })

  const populatedDishes: PopulatedSavedDish[] = completedDishes.map(completedDish => ({
    ...completedDish,
    dishData: dishMap[completedDish.dishId] || null
  }))

  return populatedDishes
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

export const getCompletionStatus = async(userId: string, dishId: string) => {
  const statusQuery = query(collection(db, 'Completed'), where('userId', '==', userId), where('dishId', '==', dishId))
  const statusQuerySnapshot = await getDocs(statusQuery)

  const statusDocs = statusQuerySnapshot.docs[0]

  if (statusDocs.exists()) {
    return true
  }

  return false
}

export const getRatingByDish = async(dishId: string) => {
  let rating: any[] = []

  const ratingQuery = query(collection(db, 'Rating'), where('dishId', '==', dishId))
  const ratingQuerySnapshot = await getDocs(ratingQuery)
  
  for (const docSnapshot of ratingQuerySnapshot.docs) {
    const ratingData = docSnapshot.data()
    const userId = ratingData.userId

    const userDoc = await getDoc(doc(db, 'User', userId))

    const userData = userDoc.exists() ? userDoc.data() : null
    rating.push({ id: docSnapshot.id, ...ratingData, user: userData })
  }

  rating.sort((a, b) => b.star - a.star)

  return rating
}

export const getRatingByChef = async(chefId: string) => {
  let rating: any[] = []

  const ratingQuery = query(collection(db, 'Rating'), where('chefId', '==', chefId))
  const ratingQuerySnapshot = await getDocs(ratingQuery)

  ratingQuerySnapshot.forEach(doc => {
    rating = [...rating, { id: doc.id, ...doc.data() }]
  })

  return rating
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