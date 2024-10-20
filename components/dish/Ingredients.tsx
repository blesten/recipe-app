import { View, Text, PixelRatio } from 'react-native'

const Ingredients = () => {
  return (
    <View style={{ paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), marginTop: PixelRatio.getPixelSizeForLayoutSize(10) }}>
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Ingredients</Text>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7), flexDirection: 'row', gap: 18 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
          <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
            <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
          <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
            <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
          <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
            <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
          <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
            <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Ingredients