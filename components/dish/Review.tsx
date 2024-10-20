import { View, Text, TouchableWithoutFeedback, Image, Animated, PixelRatio, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface IProps {
  toggleReviewsOverlay: () => void
  slideAnim: any
}

const Review = ({ toggleReviewsOverlay, slideAnim }: IProps) => {
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
              <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(4), flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Image source={require('./../../assets/images/icons/colored/filter.png')} />
                <View style={{ flexDirection: 'row', gap: 14 }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: Colors.PRIMARY,
                      alignSelf: 'flex-start',
                      paddingVertical: PixelRatio.getPixelSizeForLayoutSize(3),
                      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
                      backgroundColor: Colors.ACCENT
                    }}
                  >
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale() }}>Highest Rating</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      alignSelf: 'flex-start',
                      paddingVertical: PixelRatio.getPixelSizeForLayoutSize(3),
                      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5)
                    }}
                  >
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale() }}>Newest</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(14) }}>
              <View>
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
                    <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>JD</Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'poppins-medium', fontSize: 15 * PixelRatio.getFontScale() }}>John Doe</Text>
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>25 October 2024</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                </View>
                <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(3) }}>The recipe works like a charm!</Text>
                <View style={{ width: 'auto', height: 1, backgroundColor: '#CCC', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }} />
              </View>
              <View>
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
                    <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>JD</Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'poppins-medium', fontSize: 15 * PixelRatio.getFontScale() }}>John Doe</Text>
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>25 October 2024</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                </View>
                <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(3) }}>The recipe works like a charm!</Text>
                <View style={{ width: 'auto', height: 1, backgroundColor: '#CCC', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }} />
              </View>
              <View>
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
                    <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>JD</Text>
                  </View>
                  <View>
                    <Text style={{ fontFamily: 'poppins-medium', fontSize: 15 * PixelRatio.getFontScale() }}>John Doe</Text>
                    <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>25 October 2024</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                  <Image source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 22, height: 22, marginLeft: -4 }} />
                </View>
                <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(3) }}>The recipe works like a charm!</Text>
                <View style={{ width: 'auto', height: 1, backgroundColor: '#CCC', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }} />
              </View>
            </ScrollView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Review