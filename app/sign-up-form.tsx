import { View, Text, SafeAreaView, TextInput, TouchableOpacity, PixelRatio } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const SignOutForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

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
                fontSize: PixelRatio.getPixelSizeForLayoutSize(17)
              }}
            >
              Sign
            </Text>
            <Text
              style={{
                fontFamily: 'literata-semibold',
                color: '#fff',
                fontSize: PixelRatio.getPixelSizeForLayoutSize(17)
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
              fontSize: PixelRatio.getPixelSizeForLayoutSize(5.2),
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
              fontSize: PixelRatio.getPixelSizeForLayoutSize(5)
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignOutForm