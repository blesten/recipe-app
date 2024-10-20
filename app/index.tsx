import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { Text } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

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
      if (storeVal && storeVal === 'Y') {
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

  return <Text>Loading fonts ...</Text>
}

export default Index