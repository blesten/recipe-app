import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import { getChefDishes } from '@/utils/function'
import { Colors } from '@/constants/Colors'

const ChefLatestDishes = () => {
  const { id } = useLocalSearchParams()

  const [chefDishes, setChefDishes] = useState<any[]>([])

  const [theme, setTheme] = useState(Appearance.getColorScheme())
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getDishes = async() => {
    if (id) {
      setLoading(true)
      const result = await getChefDishes(id as string)
      if (result)
        setChefDishes(result)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id)
      getDishes()
  }, [id])

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
      <View style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5), marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
        {
          loading
          ? <ActivityIndicator color={Colors.PRIMARY} size='large' style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }} />
          : (
            <>
              {
                chefDishes.length === 0
                ? <Text>Empty</Text>
                : (
                  <FlatList
                    refreshing={loading}
                    onRefresh={getDishes}
                    data={chefDishes}
                    renderItem={({item, index}) => (
                      <HorizontalDishCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        createdAt={item.createdAt}
                      />
                    )}
                  />
                )
              }
            </>
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default ChefLatestDishes