import { View, Image, Text, Dimensions, PixelRatio, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

interface IProps {
  data: any
  idx: number
  len: number
}

const DishCard = ({ data, idx, len }: IProps) => {
  const { width } = Dimensions.get('window')

  const router = useRouter()

  return (
    <View style={{ alignItems: 'center', alignSelf: 'flex-start', marginRight: idx !== len - 1 ? PixelRatio.getPixelSizeForLayoutSize(7) : 0 }}>
      <View
        style={{
          width: width * 0.5,
          height: 220,
          backgroundColor: '#efefef',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#eee',
          position: 'relative'
        }}
      >
        <Image source={{ uri: data.image }} style={{ width: '100%', height: '100%', borderRadius: 10, borderWidth: 1, borderColor: '#eee' }} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,.4)',
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingBottom: 45,
            justifyContent: 'flex-end'
          }}
        >
          <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 22 * PixelRatio.getFontScale(), textAlign: 'center' }}>{data.title}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push(`/dish/${data.id}`)} activeOpacity={1}>
        <View
          style={{
            borderRadius: 50,
            borderWidth: 4,
            borderColor: '#fff',
            alignSelf: 'flex-start',
            marginTop: -23,
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
              paddingVertical: 9,
              paddingHorizontal: 20
            }}
          >
            <Ionicons name='play' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='#fff' />
            <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 14 * PixelRatio.getFontScale() }}>Let’s Try!</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DishCard