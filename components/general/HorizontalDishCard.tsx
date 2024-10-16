import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, TouchableOpacity, PixelRatio } from 'react-native'

const HorizontalDishCard = () => {
  return (
    <View
      style={{
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 10,
        backgroundColor: '#fff',
        gap: 12,
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(7)
      }}
    >
      <View
        style={{
          width: PixelRatio.getPixelSizeForLayoutSize(35),
          height: PixelRatio.getPixelSizeForLayoutSize(35),
          backgroundColor: '#eee',
          borderRadius: 10
        }}
      >

      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1
        }}
      >
        <View>
          <Text style={{ fontFamily: 'poppins-medium', color: Colors.PRIMARY, fontSize: 16 * PixelRatio.getFontScale() }}>Greek Salad</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginTop: 3
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Ionicons name='star' size={14} color='#FFA621' style={{ marginTop: -2 }} />
              <Text style={{ fontFamily: 'poppins-semibold', fontSize: 10 * PixelRatio.getFontScale() }}>4.9</Text>
            </View>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 10 * PixelRatio.getFontScale(), color: '#B3B3B3' }}>(20 reviews)</Text>
          </View>
          <TouchableOpacity style={{ marginTop: 5 }} activeOpacity={1}>
            <View
              style={{
                borderRadius: 50,
                borderWidth: 4,
                borderColor: '#fff',
                alignSelf: 'flex-start'
              }}
            >
              <LinearGradient
                colors={[Colors.PRIMARY, Colors.SECONDARY]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 7,
                  paddingVertical: 7,
                  paddingHorizontal: 16
                }}
              >
                <Ionicons name='play' size={PixelRatio.getPixelSizeForLayoutSize(6)} color='#fff' style={{ marginTop: -3 }} />
                <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 12 * PixelRatio.getFontScale() }}>Let’s Try!</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#797979', fontFamily: 'poppins-regular', fontSize: 9 * PixelRatio.getFontScale() }}>3 months ago</Text>
      </View>
    </View>
  )
}

export default HorizontalDishCard