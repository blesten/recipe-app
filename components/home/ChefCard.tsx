import { Text, PixelRatio, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

interface IProps {
  data: any
}

const ChefCard = ({ data }: IProps) => {
  const router = useRouter()

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => router.push(`/chef/${data.id}`)} style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          borderRadius: 8,
          paddingTop: PixelRatio.getPixelSizeForLayoutSize(4.6),
          paddingBottom: PixelRatio.getPixelSizeForLayoutSize(4.3),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5)
        }}
      >
        {
          data.avatar
          ? <Image source={{ uri: data.avatar }} style={{ width: '100%', height: '100%', borderRadius: 8, borderWidth: 1, borderColor: '#DADADA' }} />
          : (
            <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', fontSize: 21 * PixelRatio.getFontScale() }}>
              {(data.name.trim().split(' ').length === 1 ? `${data.name.trim().split(' ')[0][0]}` : `${data.name.trim().split(' ')[0][0]} ${data.name.trim().split(' ')[data.name.trim().split(' ').length - 1][0]}`)}
            </Text>
          )
        }
      </LinearGradient>
      <Text style={{ fontSize: 12 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(2), fontFamily: 'poppins-regular', textAlign: 'center' }}>{data.name}</Text>
    </TouchableOpacity>
  )
}

export default ChefCard