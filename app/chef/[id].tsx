import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import Header from '@/components/chef/Header'
import Detail from '@/components/chef/Detail'
import { DocumentData } from 'firebase/firestore'
import { getChefDishes, getCheftById } from '@/utils/function'

const ChefDetail = () => {
  const { id } = useLocalSearchParams()

  const [theme, setTheme] = useState(Appearance.getColorScheme())
  const [chefProfile, setChefProfile] = useState<DocumentData | null>(null)
  const [chefDishes, setChefDishes] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const getChefData = async(id: string) => {
      const result = await getCheftById(id)
      if (result)
        setChefProfile(result)
    }

    if (id)
      getChefData(id as string)
  }, [id])

  useEffect(() => {
    const getDishes = async(id: string) => {
      const result = await getChefDishes(id)
      setChefDishes(result)
    }

    if (chefProfile)
      getDishes(chefProfile.id)
  }, [chefProfile])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <Header chef={chefProfile} />
      <Detail chef={chefProfile} dishes={chefDishes} />
      <View style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(7), marginTop: PixelRatio.getPixelSizeForLayoutSize(9) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Chef's Latest Dishes</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => router.push(`/chef-latest-dishes/${chefProfile && chefProfile.id}`)}>
            <Text style={{ fontFamily: 'poppins-semibold', color: Colors.PRIMARY, fontSize: 14 * PixelRatio.getFontScale() }}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(6), marginBottom: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <ScrollView>
            {
              chefDishes.map(item => (
                <HorizontalDishCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  createdAt={item.createdAt}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChefDetail