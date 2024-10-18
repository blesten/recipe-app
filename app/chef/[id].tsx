import { View, Text, Appearance, StatusBar, Image, TouchableOpacity, PixelRatio, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import HorizontalDishCard from '@/components/general/HorizontalDishCard'

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
      <View style={{ position: 'relative' }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, left: 16, zIndex: 1 }}>
          <Ionicons name='arrow-back-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
        </TouchableOpacity>
        <Image source={require('./../../assets/images/chef_detail.png')} />
        <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, right: 16, zIndex: 1 }}>
          <Ionicons name='share-social' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 30, padding: PixelRatio.getPixelSizeForLayoutSize(8), marginTop: -60, elevation: 2 }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(28),
                height: PixelRatio.getPixelSizeForLayoutSize(28),
                borderRadius: 10,
                backgroundColor: Colors.PRIMARY
              }}
            />
            <View style={{ gap: 3 }}>
              <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale() }}>Esther Howard</Text>
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#979797' }}>24 October 2024</Text>
            </View>
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7) }}>
            <Text style={{ color: '#707070', fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular', textAlign: 'justify' }}>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum </Text>
          </View>
        </View>
        <View style={{ width: 'auto', height: 1, backgroundColor: '#E2E2E2', marginVertical: PixelRatio.getPixelSizeForLayoutSize(5) }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Image source={require('./../../assets/images/icons/colored/star.png')} />
              <Text style={{ fontFamily: 'poppins-semibold', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.5) }}>4.8</Text>
            </View>
            <Text style={{ fontFamily: 'poppins-regular', color: '#A0A0A0', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.6) }}>(200 reviews)</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 9, alignItems: 'center' }}>
            <Image source={require('./../../assets/images/icons/colored/dish.png')} />
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(2) }}>5 dishes</Text>
          </View>
        </View>
      </View>
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