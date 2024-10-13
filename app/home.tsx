import { ScrollView, PixelRatio, Appearance, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PopularDish from '@/components/home/PopularDish'
import BestChef from '@/components/home/BestChef'
import Header from '@/components/home/Header'
import Search from '@/components/home/Search'

const Home = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home