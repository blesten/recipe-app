import { View, Text, Image, PixelRatio } from 'react-native'
import { Colors } from '@/constants/Colors'

const Detail = () => {
  return (
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
  )
}

export default Detail