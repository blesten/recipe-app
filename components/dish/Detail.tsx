import { View, Image, Text, PixelRatio, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

interface IProps {
  toggleReviewsOverlay: () => void
}

const Detail = ({ toggleReviewsOverlay }: IProps) => {
  const router = useRouter()

  return (
    <View style={{ backgroundColor: '#fff', marginTop: -60, borderRadius: 25, paddingHorizontal: 10, paddingVertical: 16, elevation: 3, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Greek Salad</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.push('/chef/123')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View
            style={{
              borderRadius: 100,
              width: PixelRatio.getPixelSizeForLayoutSize(14),
              height: PixelRatio.getPixelSizeForLayoutSize(14),
              backgroundColor: Colors.PRIMARY
            }}
          />
          <Text style={{ fontFamily: 'poppins-medium', color: '#A0A0A0', fontSize: 14 * PixelRatio.getFontScale() }}>Chef Juna</Text>
        </TouchableOpacity>
        <View style={{ width: 1, height: 25, backgroundColor: '#CCC'}} />
        <TouchableOpacity activeOpacity={1} onPress={toggleReviewsOverlay} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Image source={require('./../../assets/images/icons/colored/star.png')} />
          <Text style={{ fontFamily: 'poppins-medium', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.3), color: '#A0A0A0' }}>4.8</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(9), flexDirection: 'row', gap: PixelRatio.getPixelSizeForLayoutSize(7) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/duration.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>30 min</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/calories.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>234 Kall</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/plate.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>3 serve</Text>
        </View>
      </View>
    </View>
  )
}

export default Detail