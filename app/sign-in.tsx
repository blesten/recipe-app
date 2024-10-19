import { View, Text, PixelRatio, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

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
              Sign In
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