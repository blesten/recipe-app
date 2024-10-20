import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import Header from '@/components/chef/Header'
import Detail from '@/components/chef/Detail'

const ChefDetail = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const router = useRouter()

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <Header />
      <Detail />
      <View style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(7), marginTop: PixelRatio.getPixelSizeForLayoutSize(9) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Chef's Latest Dishes</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => router.push('/chef-latest-dishes/123')}>
            <Text style={{ fontFamily: 'poppins-semibold', color: Colors.PRIMARY, fontSize: 14 * PixelRatio.getFontScale() }}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(6), marginBottom: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <ScrollView>
            <HorizontalDishCard />
            <HorizontalDishCard />
            <HorizontalDishCard />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChefDetail