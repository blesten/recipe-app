import { ScrollView, PixelRatio, Appearance, StatusBar, View, BackHandler } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import PopularDish from '@/components/home/PopularDish'
import BestChef from '@/components/home/BestChef'
import Header from '@/components/home/Header'
import Search from '@/components/home/Search'
import Tab from '@/components/general/Tab'

const Home = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true
      }
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
  
      return () => backHandler.remove()
    }, [])
  )

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