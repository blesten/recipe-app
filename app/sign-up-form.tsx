import { View, Text, SafeAreaView, TextInput, TouchableOpacity, PixelRatio, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import { validEmail, validPassword } from '@/utils/validator'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { useRouter } from 'expo-router'
import bcrypt from 'bcryptjs'

// @ts-ignore
bcrypt.setRandomFallback(len => {
  const buf = new Uint8Array(len)
  return buf.map(() => Math.floor(Math.random() * 256))
})

const SignOutForm = () => {
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const router = useRouter()

  const register = async() => {
    setLoading(true)
    try {
      if (!name) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Registration failed',
          textBody: 'Please provide name',
        })
        setLoading(false)
        return
      }

      if (!validEmail(email)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Registration failed',
          textBody: 'Please provide valid email address',
        })
        setLoading(false)
        return
      }

      const checkEmailQuery = query(collection(db, 'User'), where('email', '==', email))
      const checkEmailQuerySnapshot = await getDocs(checkEmailQuery)

      if (!checkEmailQuerySnapshot.empty) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Registration failed',
          textBody: 'Email has been registered before',
        })
        setLoading(false)
        return
      }

      if (!validPassword(password)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Registration failed',
          textBody: 'Password should be 8 characters and should contains lowercase, uppercase, number, and symbol',
        })
        setLoading(false)
        return
      }

      if (password !== passwordConfirmation) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Registration failed',
          textBody: 'Password confirmation is not matched',
        })
        setLoading(false)
        return
      }

      const passwordSalt = bcrypt.genSaltSync(10)
      const passwordHash = bcrypt.hashSync(password, passwordSalt)

      await addDoc(collection(db, 'User'), {
        name,
        email,
        password: passwordHash,
        avatar: ''
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Registration success',
        textBody: 'Credential has been registered successfully',
      })

      router.push('/sign-in')
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
          paddingVertical: PixelRatio.getPixelSizeForLayoutSize(15),
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <View>
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
              Up
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
            Become a member and smoothly navigate our application
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
                name='person-circle-outline'
                size={PixelRatio.getPixelSizeForLayoutSize(10)}
                color={Colors.PRIMARY}
              />
              <TextInput
                placeholder='Name'
                autoCapitalize='none'
                value={name}
                onChangeText={e => setName(e)}
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
                name='mail-outline'
                size={PixelRatio.getPixelSizeForLayoutSize(10)}
                color={Colors.PRIMARY}
              />
              <TextInput
                placeholder='Email address'
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={e => setEmail(e)}
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
                size={PixelRatio.getPixelSizeForLayoutSize(10)}
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
                size={PixelRatio.getPixelSizeForLayoutSize(10)}
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
                  placeholder='Password confirmation'
                  secureTextEntry={!showPasswordConfirmation}
                  autoCapitalize='none'
                  value={passwordConfirmation}
                  onChangeText={e => setPasswordConfirmation(e)}
                  style={{
                    fontFamily: 'poppins-regular',
                    flex: 1
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  activeOpacity={1}
                >
                  {
                    showPasswordConfirmation
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
        </View>
        <TouchableOpacity
          activeOpacity={.7}
          onPress={register}
          disabled={loading}
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
              : 'Sign Up'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignOutForm