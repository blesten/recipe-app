import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { Text, LogBox } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'

LogBox.ignoreLogs(['Requiring unknown module "undefined"'])

const Index = () => {
  const [loading, setLoading] = useState(true)
  const [to, setTo] = useState('/get-started')

  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./../assets/fonts/poppins/poppins_regular.ttf'),
    'poppins-medium': require('./../assets/fonts/poppins/poppins_medium.ttf'),
    'poppins-semibold': require('./../assets/fonts/poppins/poppins_semibold.ttf'),
    'poppins-bold': require('./../assets/fonts/poppins/poppins_bold.ttf'),
    'literata-semibold': require('./../assets/fonts/literata/literata_semibold.ttf')
  })

  useEffect(() => {
    const getStoreValue = async() => {
      setLoading(true)
      const storeVal = await SecureStore.getItemAsync('isAuth')

      const getUserQuery = query(collection(db, 'User'), where('email', '==', storeVal))
      const getUserQuerySnapshot = await getDocs(getUserQuery)

      if (!getUserQuerySnapshot.empty) {
        setTo('/home')
      }
      setLoading(false)
    }

    getStoreValue()
  }, [])
  
  if (fontsLoaded && !loading) {
    return (
      <Redirect href={`${to}`} />
    )
  }

  return <Text></Text>
}

export default Index