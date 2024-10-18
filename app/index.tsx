import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { Text } from 'react-native'

const Index = () => {
  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./../assets/fonts/poppins/poppins_regular.ttf'),
    'poppins-medium': require('./../assets/fonts/poppins/poppins_medium.ttf'),
    'poppins-semibold': require('./../assets/fonts/poppins/poppins_semibold.ttf'),
    'poppins-bold': require('./../assets/fonts/poppins/poppins_bold.ttf'),
    'literata-semibold': require('./../assets/fonts/literata/literata_semibold.ttf')
  })
  
  if (fontsLoaded) {
    return (
      <Redirect href={'/profile'} />
    )
  }

  return <Text>Loading fonts ...</Text>
}

export default Index