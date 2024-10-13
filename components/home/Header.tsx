import { View, Text, PixelRatio } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'

const Header = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          gap: PixelRatio.getPixelSizeForLayoutSize(1.3)
        }}
      >
        <Text style={{ color: '#A5A5A5', fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale() }}>Good morning,</Text>
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 24 * PixelRatio.getFontScale() }}>John Doe</Text>
      </View>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ borderRadius: 8 }}
      >
        <View
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(17),
            height: PixelRatio.getPixelSizeForLayoutSize(17),
            justifyContent: 'center',
            paddingTop: PixelRatio.getPixelSizeForLayoutSize(1),
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 20 * PixelRatio.getFontScale(), letterSpacing: 1 }}>JD</Text> 
        </View>
      </LinearGradient>
    </View>
  )
}

export default Header