import { View, Text, PixelRatio, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { validEmail } from '@/utils/validator'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import * as SecureStore from 'expo-secure-store'
import bcrypt from 'bcryptjs'

const SignIn = () => {
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const login = async() => {
    setLoading(true)
    try {
      if (!validEmail) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login failed',
          textBody: 'Please provide valid email address'
        })
        return
      }

      if (!password) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login failed',
          textBody: 'Please provide password'
        })
        return
      }

      const getUserQuery = query(collection(db, 'User'), where('email', '==', email))
      const getUserQuerySnapshot = await getDocs(getUserQuery)

      if (getUserQuerySnapshot.empty) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login failed',
          textBody: 'Invalid credential'
        })
        return
      }

      const userDoc = getUserQuerySnapshot.docs[0]

      const encryptedPassword = bcrypt.compareSync(password, userDoc.data().password)
      if (!encryptedPassword) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Login failed',
          textBody: 'Invalid credential'
        })
        return
      }

      await SecureStore.setItemAsync('isAuth', 'Y')

      router.push('/home')
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={Colors.PRIMARY}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Colors.PRIMARY,
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'literata-semibold',
              color: '#fff',
              fontSize: 48 * PixelRatio.getFontScale()
            }}
          >
            Sign
          </Text>
          <Text
            style={{
              fontFamily: 'literata-semibold',
              color: '#fff',
              fontSize: 48 * PixelRatio.getFontScale()
            }}
          >
            In
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'poppins-regular',
            color: '#fff',
            marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
            fontSize: 15 * PixelRatio.getFontScale(),
            lineHeight: PixelRatio.getPixelSizeForLayoutSize(11)
          }}
        >
          Let’s get authenticated to experience every available features
        </Text>
        <View
          style={{
            marginTop: PixelRatio.getPixelSizeForLayoutSize(14),
            display: 'flex',
            gap: PixelRatio.getPixelSizeForLayoutSize(10)
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              alignItems: 'center',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              borderRadius: 6,
              gap: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          >
            <Ionicons
              name='mail-outline'
              size={PixelRatio.getPixelSizeForLayoutSize(8)}
              color={Colors.PRIMARY}
            />
            <TextInput
              placeholder='Email address'
              keyboardType='email-address'
              value={email}
              onChangeText={e => setEmail(e)}
              autoCapitalize='none'
              style={{
                flex: 1,
                fontFamily: 'poppins-regular',
                marginTop: PixelRatio.getPixelSizeForLayoutSize(1.5)
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              alignItems: 'center',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              borderRadius: 6,
              gap: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          >
            <Ionicons
              name='key'
              size={PixelRatio.getPixelSizeForLayoutSize(8)}
              color={Colors.PRIMARY}
            />
            <View
              style={{
                marginTop: PixelRatio.getPixelSizeForLayoutSize(1.5),
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: PixelRatio.getPixelSizeForLayoutSize(4)
              }}
            >
              <TextInput
                placeholder='Password'
                secureTextEntry={!showPassword}
                autoCapitalize='none'
                value={password}
                onChangeText={e => setPassword(e)}
                style={{
                  fontFamily: 'poppins-regular',
                  flex: 1
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={1}
              >
                {
                  showPassword
                  ? (
                    <Ionicons
                      name='eye-off-sharp'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color={Colors.PRIMARY}
                    />
                  )
                  : (
                    <Ionicons
                      name='eye'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color={Colors.PRIMARY}
                    />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: PixelRatio.getPixelSizeForLayoutSize(16)
          }}
        >
          <TouchableOpacity
            activeOpacity={.7}
            disabled={loading}
            onPress={login}
            style={{
              width: '100%',
              backgroundColor: Colors.SECONDARY,
              borderRadius: 50,
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4)
            }}
          >
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontFamily: 'poppins-semibold',
                fontSize: 14 * PixelRatio.getFontScale()
              }}
            >
              {
                loading
                ? <ActivityIndicator color='#fff' />
                : 'Sign In'
              }
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              marginTop: PixelRatio.getPixelSizeForLayoutSize(4),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(1)
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 13 * PixelRatio.getFontScale(),
                fontFamily: 'poppins-medium'
              }}
            >
              Don't have an account yet? Click
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/sign-up')}
              activeOpacity={1}
            >
              <Text
                style={{
                  color: '#3b55ff',
                  fontSize: PixelRatio.getPixelSizeForLayoutSize(4.5),
                  fontFamily: 'poppins-medium',
                  textDecorationLine: 'underline'
                }}
              >
                here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: PixelRatio.getPixelSizeForLayoutSize(5),
            marginTop: PixelRatio.getPixelSizeForLayoutSize(9)
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#fff'
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'poppins-medium',
              fontSize: 11 * PixelRatio.getFontScale()
            }}
          >
            OR
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#fff'
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={.7}
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 50,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
            marginTop: PixelRatio.getPixelSizeForLayoutSize(9),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: PixelRatio.getPixelSizeForLayoutSize(4)
          }}
        >
          <Image
            source={require('./../assets/images/google.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'poppins-medium',
              fontSize: 14 * PixelRatio.getFontScale()
            }}
          >
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignIn