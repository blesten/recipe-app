import { View, Text, TouchableWithoutFeedback, Image, Animated, PixelRatio, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface IProps {
  rating: any[]
  toggleReviewsOverlay: () => void
  slideAnim: any
}

const Review = ({ rating, toggleReviewsOverlay, slideAnim }: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={toggleReviewsOverlay}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,.8)',
          justifyContent: 'flex-end',
          zIndex: 3
        }}
      >
        <TouchableWithoutFeedback>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              maxHeight: PixelRatio.getPixelSizeForLayoutSize(200),
              borderTopRightRadius: 20,
              padding: PixelRatio.getPixelSizeForLayoutSize(10),
              transform: [{ translateY: slideAnim }]
            }}
          >
            <View>
              <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale() }}>Dish Reviews</Text>
            </View>
            <ScrollView style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12) }}>
              {
                rating.length > 0
                ? (
                  <>
                    {
                      rating.map(item => (
                        <View key={item.id}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View
                              style={{
                                width: PixelRatio.getPixelSizeForLayoutSize(18),
                                height: PixelRatio.getPixelSizeForLayoutSize(18),
                                backgroundColor: Colors.PRIMARY,
                                borderRadius: 7,
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              {
                                item.user.avatar
                                ? <Image source={{ uri: item.user.avatar }} style={{ width: '100%', height: '100%', borderRadius: 7, borderWidth: 1, borderColor: '#DADADA' }} />
                                : <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>{(item.user.name.trim().split(' ').length === 1 ? `${item.user.name.trim().split(' ')[0][0]}` : `${item.user.name.trim().split(' ')[0][0]} ${item.user.name.trim().split(' ')[item.user.name.trim().split(' ').length - 1][0]}`)}</Text>
                              }
                            </View>
                            <View>
                              <Text style={{ fontFamily: 'poppins-medium', fontSize: 15 * PixelRatio.getFontScale() }}>
                                {item.user.name}
                              </Text>
                              <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>
                                {
                                  new Date(item.createdAt.seconds * 1000).toLocaleString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })
                                }
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
                            {
                              Array.from({ length: item.star }).map((_, idx) => (
                                <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                              ))
                            }
                          </View>
                          <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(3) }}>
                            {
                              item.description
                            }
                          </Text>
                          <View style={{ width: 'auto', height: 1, backgroundColor: '#CCC', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }} />
                        </View>
                      ))
                    }
                  </>
                )
                : (
                  <View style={{ alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
                    <Image source={require('./../../assets/images/empty.png')} />
                    <Text style={{ fontFamily: 'poppins-medium', fontSize: 16 * PixelRatio.getFontScale(), color: '#A0A0A0', textAlign: 'center',  }}>There's no review on this dish</Text>
                  </View>
                )
              }
            </ScrollView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Review