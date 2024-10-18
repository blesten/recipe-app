import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'

const ChefLatestDishes = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const router = useRouter()

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(5)}}>
        <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2) }}>
          <Ionicons name='arrow-back-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.2), flex: 1 }}>Chef's Latest Dishes</Text>
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5), marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
        <HorizontalDishCard />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChefLatestDishes