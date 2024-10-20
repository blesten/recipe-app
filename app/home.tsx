import { ScrollView, PixelRatio, Appearance, StatusBar, View, BackHandler } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PopularDish from '@/components/home/PopularDish'
import BestChef from '@/components/home/BestChef'
import Header from '@/components/home/Header'
import Search from '@/components/home/Search'
import Tab from '@/components/general/Tab'
import { useRouter } from 'expo-router'

const Home = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const router = useRouter()

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const backAction = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [router])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5.5),
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(6),
            backgroundColor: '#fff'
          }}
        >
          <Header />
          <Search />
          <BestChef />
          <PopularDish />
          <View style={{ height: PixelRatio.getPixelSizeForLayoutSize(24) }} />
        </ScrollView>
        <Tab />
      </View>
    </SafeAreaView>
  )
}

export default Home