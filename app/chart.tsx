import { View, Text, Appearance, StatusBar, ScrollView, Image, PixelRatio } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import Tab from '@/components/general/Tab'

const Chart = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <View style={{ height: PixelRatio.getPixelSizeForLayoutSize(50), backgroundColor: '#ccc', overflow: 'hidden', paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <Image
          source={require('./../assets/images/saved.png')} style={{ position: 'absolute', top: 0, marginTop: -7 }}
        />
        <View style={{ flex: 1, justifyContent: 'center', gap: 4, marginTop: -25 }}>
          <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>Completed Dishes</Text>
          <Text style={{ color: '#fff', fontFamily: 'poppins-regular', fontSize: 14 * PixelRatio.getFontScale() }}>Find all your completed dishes at here</Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8)
          }}
        >
          <HorizontalDishCard />
          <HorizontalDishCard />
          <HorizontalDishCard />
          <HorizontalDishCard />
          <View style={{ height: PixelRatio.getPixelSizeForLayoutSize(24) }} />
        </ScrollView>
      </View>
      <Tab />
    </SafeAreaView>
  )
}

export default Chart