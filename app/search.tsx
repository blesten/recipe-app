import HorizontalDishCard from '@/components/general/HorizontalDishCard'
import { db } from '@/config/firebaseConfig'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { View, Text, StatusBar, PixelRatio, TouchableOpacity, Appearance, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const [dishes, setDishes] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const searchDish = async(search: string) => {
      setLoading(true)
      setDishes([])
      const dishesRef = collection(db, 'Dish')
      const q = query(
        dishesRef,
        where('title', '>=', search),
        where('title', '<=', search + '\uf8ff')
      )

      const querySnapshot = await getDocs(q)
      let results: any[] = []

      querySnapshot.forEach(doc => {
        results.push({ id: doc.id, ...doc.data() })
      })

      setDishes(results)
      setLoading(false)
    }

    if (searchValue.length > 3)
      searchDish(searchValue)
    else
      setDishes([])
  }, [searchValue])

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
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.2), flex: 1 }}>Search</Text>
      </View>
      <View style={{ flex:1,  paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            backgroundColor: '#EFEFEF',
            borderWidth: 1,
            borderColor: '#CCC',
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
            borderRadius: 7,
            marginTop: PixelRatio.getPixelSizeForLayoutSize(7),
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6)
          }}
        >
          <Ionicons name='search' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='#A6A6A6' />
          <TextInput
            placeholder='Ayam tinoransak'
            value={searchValue}
            onChangeText={e => setSearchValue(e)}
            style={{
              fontFamily: 'poppins-regular',
              flex: 1,
              marginTop: PixelRatio.getPixelSizeForLayoutSize(1)
            }}
          />
        </View>
        <ScrollView style={{ flex: 1, marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
          {
            loading
            ? <ActivityIndicator color={Colors.PRIMARY} size='large' style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }} />
            : (
              <>
                {
                  searchValue.length > 3 && dishes.length === 0
                  ? (
                    <View>
                      <Text>Empty</Text>
                    </View>
                  )
                  : (
                    <>
                      {
                        dishes.map(item => (
                          <HorizontalDishCard
                            key={item.id}
                          />
                        ))
                      }
                    </>
                  )
                }
              </>
            )
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Search