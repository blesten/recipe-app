import { View, TouchableOpacity, PixelRatio } from 'react-native'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const Header = () => {
  const router = useRouter()

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, left: 16, zIndex: 1 }}>
        <Ionicons name='arrow-back-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
      </TouchableOpacity>
      <View
        style={{
          height: 225,
          backgroundColor: '#ddd',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }}
      >
        
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2), backgroundColor: '#fff', position: 'absolute', top: 18, right: 16, zIndex: 1 }}>
        <Ionicons name='bookmark-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
      </TouchableOpacity>
    </View>
  )
}

export default Header