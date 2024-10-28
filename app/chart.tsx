import { View, Text, Appearance, StatusBar, ScrollView, Image, PixelRatio, ActivityIndicator, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import Tab from '@/components/general/Tab'
import { getCompletedDish, getUserData } from '@/utils/function'
import { Colors } from '@/constants/Colors'

const Chart = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())
  const [userId, setUserId] = useState('')
  const [dishes, setDishes] = useState<any[] | undefined>([])
  const [loading, setLoading] = useState(false)

  const getCompletedData = async() => {
    setLoading(true)
    const result = await getCompletedDish(userId)
    setDishes(result)
    setLoading(false)
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    if (userId)
      getCompletedData()
  }, [userId])

  useEffect(() => {
    const getUser = async() => {
      const userData = await getUserData()
      if (userData) {
        setUserId(userData.data.id)
      }
    }

    getUser()
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
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8),
            marginBottom: PixelRatio.getPixelSizeForLayoutSize(10)
          }}
        >
          {
            loading
            ? <ActivityIndicator color={Colors.PRIMARY} size='large' style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }} />
            : (
              <>
                {
                  dishes &&
                  dishes.length === 0
                  ? <Text>Empty</Text>
                  : (
                    <FlatList
                      refreshing={loading}
                      onRefresh={getCompletedData}
                      data={dishes!}
                      renderItem={({item, index}) => (
                        <HorizontalDishCard
                          key={item.dishId}
                          id={item.dishId}
                          title={item.dishData.title}
                          image={item.dishData.image}
                          createdAt={item.dishData.createdAt}
                        />
                      )}
                    />
                  )
                }
              </>
            )
          }
        </View>
      </View>
      <Tab />
    </SafeAreaView>
  )
}

export default Chart