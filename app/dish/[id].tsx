import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, Image, ScrollView, Dimensions, Animated, TouchableWithoutFeedback, TextInput } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'

const DishDetail = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const [isReviewsClicked, setIsReviewsClicked] = useState(false)
  const [isCompleteBtnClicked, setIsCompleteBtnClicked] = useState(false)

  const screenHeight = Dimensions.get('window').height
  const slideAnim = useRef(new Animated.Value(screenHeight)).current

  const router = useRouter()

  const toggleCompleteBtnOverlay = () => {
    if (isCompleteBtnClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true
      }).start(() => setIsCompleteBtnClicked(false))
    } else {
      setIsCompleteBtnClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }

  const toggleReviewsOverlay = () => {
    if (isReviewsClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true
      }).start(() => setIsReviewsClicked(false))
    } else {
      setIsReviewsClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
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
      <View style={{ backgroundColor: '#fff', marginTop: -60, borderRadius: 25, paddingHorizontal: 10, paddingVertical: 16, elevation: 3, marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Greek Salad</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
          <TouchableOpacity activeOpacity={1} onPress={() => router.push('/chef/123')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                borderRadius: 100,
                width: PixelRatio.getPixelSizeForLayoutSize(14),
                height: PixelRatio.getPixelSizeForLayoutSize(14),
                backgroundColor: Colors.PRIMARY
              }}
            />
            <Text style={{ fontFamily: 'poppins-medium', color: '#A0A0A0', fontSize: 14 * PixelRatio.getFontScale() }}>Chef Juna</Text>
          </TouchableOpacity>
          <View style={{ width: 1, height: 25, backgroundColor: '#CCC'}} />
          <TouchableOpacity onPress={toggleReviewsOverlay} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Image source={require('./../../assets/images/icons/colored/star.png')} />
            <Text style={{ fontFamily: 'poppins-medium', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.3), color: '#A0A0A0' }}>4.8</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(9), flexDirection: 'row', gap: PixelRatio.getPixelSizeForLayoutSize(7) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={require('./../../assets/images/icons/colored/duration.png')} />
            <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>30 min</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={require('./../../assets/images/icons/colored/calories.png')} />
            <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>234 Kall</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={require('./../../assets/images/icons/colored/plate.png')} />
            <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.4) }}>3 serve</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), marginTop: PixelRatio.getPixelSizeForLayoutSize(10) }}>
            <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Ingredients</Text>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7), flexDirection: 'row', gap: 18 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
                <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                  <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
                  <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
                <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                  <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
                  <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
                <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                  <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
                  <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ccc', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8 }} />
                <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                  <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale() }}>Tomato</Text>
                  <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>1 item</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), marginTop: PixelRatio.getPixelSizeForLayoutSize(10) }}>
            <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Cooking Instruction</Text>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7) }}>
              <View style={{ backgroundColor: Colors.ACCENT, borderRadius: 5, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4), marginBottom: PixelRatio.getPixelSizeForLayoutSize(10) }}>
                <Text style={{ fontFamily: 'poppins-semibold', fontSize: 16 * PixelRatio.getFontScale(), color: Colors.PRIMARY }}>Step 1</Text>
                <Text style={{ fontFamily: 'poppins-regular', textAlign: 'justify', fontSize: 13 * PixelRatio.getFontScale(), lineHeight: 21, marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil</Text>
              </View>
              <View style={{ backgroundColor: Colors.ACCENT, borderRadius: 5, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4), marginBottom: PixelRatio.getPixelSizeForLayoutSize(10) }}>
                <Text style={{ fontFamily: 'poppins-semibold', fontSize: 16 * PixelRatio.getFontScale(), color: Colors.PRIMARY }}>Step 1</Text>
                <Text style={{ fontFamily: 'poppins-regular', textAlign: 'justify', fontSize: 13 * PixelRatio.getFontScale(), lineHeight: 21, marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil. Bring well-salted water to a boil</Text>
              </View>
            </View>
          </View>
          <LinearGradient
            colors={[Colors.PRIMARY, Colors.SECONDARY]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
              borderRadius: 100,
              paddingVertical: 10,
              marginBottom: PixelRatio.getPixelSizeForLayoutSize(10)
            }}
          >
            <TouchableOpacity activeOpacity={1} onPress={toggleCompleteBtnOverlay}>
              <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', textAlign: 'center' }}>Mark as Complete</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>

      {
        isCompleteBtnClicked &&
        <TouchableWithoutFeedback onPress={toggleCompleteBtnOverlay}>
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
                  borderTopRightRadius: 20,
                  padding: 20,
                  transform: [{ translateY: slideAnim }],
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image source={require('./../../assets/images/review.png')} />
                <View style={{ flexDirection: 'row', marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
                  <Image source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                  <Image source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                  <Image source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                  <Image source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                  <Image source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                </View>
                <TextInput
                  placeholder='Recipe works like a charm 😊'
                  style={{
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 7,
                    height: PixelRatio.getPixelSizeForLayoutSize(30),
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
                    alignSelf: 'flex-start',
                    width: '100%',
                    textAlignVertical: 'top',
                    fontFamily: 'poppins-regular',
                    padding: PixelRatio.getPixelSizeForLayoutSize(5),
                    fontSize: 13 * PixelRatio.getFontScale()
                  }}
                />
                <LinearGradient
                  colors={[Colors.PRIMARY, Colors.SECONDARY]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 100,
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(9),
                    width: '100%',
                    paddingVertical: PixelRatio.getPixelSizeForLayoutSize(3)
                  }}
                >
                  <TouchableOpacity activeOpacity={1}>
                    <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', textAlign: 'center' }}>Submit</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity activeOpacity={1} style={{ marginTop: 8 }}>
                  <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale() }}>Skip for now</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      }

      {
        isReviewsClicked &&
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
      }
    </SafeAreaView>
  )
}

export default DishDetail