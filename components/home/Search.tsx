import { View, Text, PixelRatio } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const Search = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        backgroundColor: '#DEDEDE',
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
        borderRadius: 7,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6)
      }}
    >
      <Ionicons name='search' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='#A6A6A6' />
      <Text style={{ fontFamily: 'poppins-medium', color: '#A6A6A6' }}>Ayam tinoransak</Text>
    </View>
  )
}

export default Search