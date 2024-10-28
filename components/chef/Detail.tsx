import { View, Text, Image, PixelRatio } from 'react-native'
import { Colors } from '@/constants/Colors'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getRatingByChef } from '@/utils/function'

interface IProps {
  chef: DocumentData | null
  dishes: any[]
}

const Detail = ({ chef, dishes }: IProps) => {
  const [rating, setRating] = useState<any[]>([])

  useEffect(() => {
    const getRating = async(id: string) => {
      const result = await getRatingByChef(id)
      setRating(result)
    }

    if (chef)
      getRating(chef.id)
  }, [chef])

  return (
    <View style={{ backgroundColor: '#fff', borderRadius: 30, padding: PixelRatio.getPixelSizeForLayoutSize(8), marginTop: -60, elevation: 2 }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(28),
              height: PixelRatio.getPixelSizeForLayoutSize(28),
              borderRadius: 10,
              backgroundColor: Colors.PRIMARY,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {
              chef && chef.avatar
              ? <Image source={{ uri: chef.avatar }} style={{ width: '100%', height: '100%', borderRadius: 10, borderWidth: 1, borderColor: '#DADADA' }} />
              : (
                <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 36 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(2) }}>
                  {chef && (chef.name.trim().split(' ').length === 1 ? `${chef.name.trim().split(' ')[0][0]}` : `${chef.name.trim().split(' ')[0][0]} ${chef.name.trim().split(' ')[chef.name.trim().split(' ').length - 1][0]}`)}
                </Text>
              )
            }
          </View>
          <View style={{ gap: 3 }}>
            <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale() }}>Chef {chef && chef.name}</Text>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#979797' }}>
              {chef && new Date(chef.createdAt.seconds * 1000).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7) }}>
          <Text style={{ color: '#707070', fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular', textAlign: 'justify' }}>{chef && chef.description}</Text>
        </View>
      </View>
      <View style={{ width: 'auto', height: 1, backgroundColor: '#E2E2E2', marginVertical: PixelRatio.getPixelSizeForLayoutSize(5) }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Image source={require('./../../assets/images/icons/colored/star.png')} />
            <Text style={{ fontFamily: 'poppins-semibold', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.5) }}>
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
          </View>
          <Text style={{ fontFamily: 'poppins-regular', color: '#A0A0A0', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.6) }}>
            {
              rating.length > 0
              ? `(${rating.length} ${rating.length > 1 ? 'reviews' : 'review'})`
              : ''
            }
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 9, alignItems: 'center' }}>
          <Image source={require('./../../assets/images/icons/colored/dish.png')} />
          <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(2) }}>{dishes.length} {dishes.length > 1 ? 'Dishes' : 'Dish'}</Text>
        </View>
      </View>
    </View>
  )
}

export default Detail