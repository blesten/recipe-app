import { Text, PixelRatio, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const ChefCard = () => {
  const router = useRouter()

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => router.push(`/chef/${123}`)} style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          borderRadius: 8,
          paddingTop: PixelRatio.getPixelSizeForLayoutSize(4.7),
          paddingBottom: PixelRatio.getPixelSizeForLayoutSize(4.5),
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ letterSpacing: 1, fontFamily: 'poppins-medium', color: '#fff', fontSize: 20 * PixelRatio.getFontScale() }}>JD</Text>
      </LinearGradient>
      <Text style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(2), fontFamily: 'poppins-regular', textAlign: 'center' }}>Juna</Text>
    </TouchableOpacity>
  )
}

export default ChefCard