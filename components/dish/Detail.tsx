import { View, Image, Text, PixelRatio, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getCheftById, getRatingByDish } from '@/utils/function'

interface IProps {
  toggleReviewsOverlay: () => void
  dish: DocumentData | null
  rating: any[]
}

const Detail = ({ rating, toggleReviewsOverlay, dish }: IProps) => {
  const router = useRouter()
  const [chefDetail, setChefDetail] = useState<DocumentData | null>(null)

  useEffect(() => {
    const getChefDetail = async(id: string) => {
      const result = await getCheftById(id)
      setChefDetail(result)
    }

    if (dish)
      getChefDetail(dish.chefId)
  }, [dish])

  return (
    <View style={{ backgroundColor: '#fff', marginTop: -60, borderRadius: 25, paddingHorizontal: 10, paddingVertical: 16, elevation: 3, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>{dish && dish.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.push(`/chef/${dish && dish.chefId}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View
            style={{
              borderRadius: 100,
              width: PixelRatio.getPixelSizeForLayoutSize(14),
              height: PixelRatio.getPixelSizeForLayoutSize(14),
              backgroundColor: Colors.PRIMARY,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {
              chefDetail && chefDetail.avatar
              ? <Image source={{ uri: chefDetail.avatar }} style={{ width: '100%', height: '100%', borderRadius: 100, borderWidth: 1, borderColor: '#EFEFEF' }} />
              : (
                <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 16 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(1) }}>
                  {chefDetail && (chefDetail.name.trim().split(' ').length === 1 ? `${chefDetail.name.trim().split(' ')[0][0]}` : `${chefDetail.name.trim().split(' ')[0][0]} ${chefDetail.name.trim().split(' ')[chefDetail.name.trim().split(' ').length - 1][0]}`)}
                </Text>
              )
            }
          </View>
          <Text style={{ fontFamily: 'poppins-medium', color: '#A0A0A0', fontSize: 14 * PixelRatio.getFontScale() }}>Chef {chefDetail && chefDetail.name}</Text>
        </TouchableOpacity>
        <View style={{ width: 1, height: 25, backgroundColor: '#CCC'}} />
        <TouchableOpacity activeOpacity={1} onPress={toggleReviewsOverlay} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Image source={require('./../../assets/images/icons/colored/star.png')} />
          <Text style={{ fontFamily: 'poppins-medium', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.3), color: '#A0A0A0' }}>
            {
              rating.length > 0
              ? (
                <>
                  {
                    ((rating.reduce((sum, rating) => sum + rating.star, 0)) / rating.length).toFixed(1)
                  }
                </>
              )
              : 'N/A'
            }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(9), flexDirection: 'row', gap: PixelRatio.getPixelSizeForLayoutSize(7) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/duration.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>{dish && dish.duration} min</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/calories.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>{dish && dish.calories} Kall</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('./../../assets/images/icons/colored/plate.png')} />
          <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>{dish && dish.serving} serve</Text>
        </View>
      </View>
    </View>
  )
}

export default Detail