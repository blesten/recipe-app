import { View, Text, PixelRatio, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import DishCard from './DishCard'
import { useRouter } from 'expo-router'

const PopularDish = () => {
  const router = useRouter()

  return (
    <View
      style={{
        marginTop: PixelRatio.getPixelSizeForLayoutSize(12)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 22 * PixelRatio.getFontScale() }}>Popular Dish</Text>
        <TouchableOpacity onPress={() => router.push('/popular-dish-list')} activeOpacity={1}>
          <Text style={{ fontFamily: 'poppins-semibold', color: Colors.SECONDARY }}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <DishCard />
      </View>
    </View>
  )
}

export default PopularDish