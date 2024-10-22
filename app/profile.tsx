import { View, Text, PixelRatio, ScrollView, Image, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import * as SecureStore from 'expo-secure-store'
import Ionicons from '@expo/vector-icons/Ionicons'
import Tab from '@/components/general/Tab'
import { DocumentData } from 'firebase/firestore'
import { getUserData } from '@/utils/function'

const profile = () => {
  const router = useRouter()

  const [isLogoutClicked, setIsLogoutClicked] = useState(false)
  const [user, setUser] = useState<DocumentData | null>(null)

  const screenHeight = Dimensions.get('window').height
  const slideAnim = useRef(new Animated.Value(screenHeight)).current

  const handleLogout = async() => {
    await SecureStore.setItemAsync('isAuth', '')
    router.push('/get-started')
  }

  const toggleLogoutOverlay = () => {
    if (isLogoutClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsLogoutClicked(false))
    } else {
      setIsLogoutClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start()
    }
  }
  
  useEffect(() => {
    const getUser = async() => {
      const result = await getUserData()
      setUser(result!.data)
    }

    getUser()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontFamily: 'poppins-medium', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }}>My Profile</Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(7) }}>
        <View
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(40),
            height: PixelRatio.getPixelSizeForLayoutSize(40),
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#DADADA',
            padding: PixelRatio.getPixelSizeForLayoutSize(5),
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View style={{ width: PixelRatio.getPixelSizeForLayoutSize(34), height: PixelRatio.getPixelSizeForLayoutSize(34), backgroundColor: Colors.PRIMARY, borderRadius: 100 }} />
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
          <Text style={{ fontFamily: 'poppins-medium', fontSize: 18 * PixelRatio.getFontScale() }}>{user && user.name}</Text>
          <Text style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(1), color: '#A8A8A8', fontFamily: 'poppins-regular', fontSize: 14 * PixelRatio.getFontScale() }}>{user && user.email}</Text>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12), gap: PixelRatio.getPixelSizeForLayoutSize(7) }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push('/edit-profile')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/edit_profile.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Edit Profile</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push('/change-password')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/change_password.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Change Password</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/chef-profile')}
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/chef_profile.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Chef Profile</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={toggleLogoutOverlay}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: PixelRatio.getPixelSizeForLayoutSize(7)
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  width: PixelRatio.getPixelSizeForLayoutSize(20),
                  height: PixelRatio.getPixelSizeForLayoutSize(20),
                  backgroundColor: '#FFD3D3',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image source={require('./../assets/images/icons/colored/logout.png')} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flex: 1
                }}  
              >
                <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Log Out</Text>
                <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Tab />

      {
        isLogoutClicked && 
        <TouchableWithoutFeedback onPress={toggleLogoutOverlay}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, .8)',
              justifyContent: 'flex-end'
            }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: PixelRatio.getPixelSizeForLayoutSize(16),
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <Image source={require('./../assets/images/sign_out.png')} />
                <Text style={{ fontFamily: 'poppins-medium', fontSize: 17 * PixelRatio.getFontScale(), marginTop: PixelRatio.getPixelSizeForLayoutSize(16) }}>Are you sure to sign out?</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
                  <TouchableOpacity onPress={toggleLogoutOverlay} style={{ backgroundColor: '#F3F3F3', borderRadius: 6, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4) }} activeOpacity={1}>
                    <Text style={{ color: '#B2B2B2', fontFamily: 'poppins-medium', fontSize: 14 * PixelRatio.getFontScale() }}>No, I'm not</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#FB5555', borderRadius: 6, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4) }} activeOpacity={1}>
                    <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 14 * PixelRatio.getFontScale() }}>Yes, I'm sure</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      }
    </SafeAreaView>
  )
}

export default profile