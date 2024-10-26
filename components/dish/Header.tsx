import { View, Image, TouchableOpacity, PixelRatio } from 'react-native'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { useEffect, useState } from 'react'
import { getDishSavedStatus, getUserData } from '@/utils/function'

interface IProps {
  dish: DocumentData | null
}

const Header = ({ dish }: IProps) => {
  const [isDishSaved, setIsDishSaved] = useState(false)
  const [userId, setUserId] = useState('')

  const router = useRouter()

  const handleSaved = async() => {
    try {
      if (isDishSaved) {
        const q = query(collection(db, 'Saved'), where('dishId', '==', dish && dish.id), where('userId', '==', userId))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          console.log('No matching documents found to delete.')
          return
        }

        querySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, 'Saved', docSnapshot.id)
          await deleteDoc(docRef)
          setIsDishSaved(false)
        })
      } else {
        await addDoc(collection(db, 'Saved'), {
          dishId: dish && dish.id,
          userId: userId
        })
  
        setIsDishSaved(true)
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getUser = async() => {
      const userData = await getUserData()
      if (userData) {
        setUserId(userData.data.id)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    const getSavedStatus = async() => {
      if (userId && dish) {
        const status = await getDishSavedStatus(userId, dish.id)
        setIsDishSaved(status)
      }
    }

    getSavedStatus()
  }, [userId, dish])

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, left: 16, zIndex: 1 }}>
        <Ionicons name='arrow-back-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
      </TouchableOpacity>
      <View
        style={{
          height: 225,
          backgroundColor: '#ddd',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }}
      >
        <Image source={{ uri: dish && dish.image }} style={{ width: '100%', height: '100%', objectFit: 'cover', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} />
      </View>
      <TouchableOpacity activeOpacity={1} onPress={handleSaved} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, right: 16, zIndex: 1 }}>
        {
          isDishSaved
          ? <Ionicons name='bookmark' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='orange' />
          : <Ionicons name='bookmark-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
        }
      </TouchableOpacity>
    </View>
  )
}

export default Header