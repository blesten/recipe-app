import { db } from '@/config/firebaseConfig'
import * as SecureStore from 'expo-secure-store'
import { collection, getDocs, query, where } from 'firebase/firestore'

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