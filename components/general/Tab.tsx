import { Colors } from '@/constants/Colors'
import { getChefProfileData, getUserData } from '@/utils/function'
import { useRoute } from '@react-navigation/native'
import { Href, useRouter } from 'expo-router'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { View, Image, PixelRatio, Text, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

const Tab = () => {
  const [isAddClicked, setIsAddClicked] = useState(false)

  const [user, setUser] = useState<DocumentData | null>(null)

  const screenHeight = Dimensions.get('window').height
  const slideAnim = useRef(new Animated.Value(screenHeight)).current

  const { name } = useRoute()

  const router = useRouter()

  const handlePress = (screen: string) => {
    if (name !== screen)
      router.push(screen as Href)
  }

  const handlePressAdd = () => {
    if (isAddClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsAddClicked(false))
    } else {
      setIsAddClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }

  const handleRedirectAdd = async() => {
    if (!user) return handlePressAdd()

    const chefProfile = await getChefProfileData(user.id)
  
    if (chefProfile) {
      router.push('/add-recipe');
    } else {
      handlePressAdd();
    }
  }

  useEffect(() => {
    const getUser = async() => {
      const result = await getUserData()
      if (result)
        setUser(result.data)
    }

    getUser()
  }, [])
  
  return (
    <>
      <View
        style={{
          marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5.5),
          marginVertical: PixelRatio.getPixelSizeForLayoutSize(5)
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#eee',
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity onPress={() => handlePress('home')} activeOpacity={1}>
            {
              name === 'home'
              ? <Image source={require('./../../assets/images/icons/colored/home.png')} />
              : <Image source={require('./../../assets/images/icons/grayscale/home.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('chart')} activeOpacity={1}>
            {
              name === 'chart'
              ? <Image source={require('./../../assets/images/icons/colored/chart.png')} />
              : <Image source={require('./../../assets/images/icons/grayscale/chart.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRedirectAdd()} activeOpacity={1}>
            {
              name === 'add-recipe'
              ? (
                <View
                  style={{
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 50
                  }}
                >
                  <Image source={require('./../../assets/images/icons/colored/add.png')} />
                </View>
              )
              : <Image source={require('./../../assets/images/icons/grayscale/add.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('saved')} activeOpacity={1}>
            {
              name === 'saved'
              ? <Image source={require('./../../assets/images/icons/colored/saved.png')} />
              : <Image source={require('./../../assets/images/icons/grayscale/saved.png')} />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('profile')} activeOpacity={1}>
            {
              name === 'profile'
              ? <Image source={require('./../../assets/images/icons/colored/profile.png')} />
              : <Image source={require('./../../assets/images/icons/grayscale/profile.png')} />
            }
          </TouchableOpacity>
        </View>
      </View>

      {
        isAddClicked &&
        <TouchableWithoutFeedback onPress={handlePressAdd}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, .8)',
              justifyContent: 'flex-end',
              zIndex: 10
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: PixelRatio.getPixelSizeForLayoutSize(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <Image source={require('./../../assets/images/chef_profile.png')} />
                <Text style={{ fontFamily: 'poppins-medium', fontSize: 17 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(16), textAlign: 'center', lineHeight: 28 }}>Oops! You need to create your chef profile to start publishing your recipes</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32, marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
                  <TouchableOpacity onPress={handlePressAdd} style={{ backgroundColor: '#F3F3F3', borderRadius: 6, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4) }} activeOpacity={1}>
                    <Text style={{ color: '#B2B2B2', fontFamily: 'poppins-medium', fontSize: 14 * PixelRatio.getFontScale() }}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push('/profile')} style={{ backgroundColor: Colors.PRIMARY, borderRadius: 6, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4) }} activeOpacity={1}>
                    <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 14 * PixelRatio.getFontScale() }}>Take me there</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      }
    </>
  )
}

export default Tab