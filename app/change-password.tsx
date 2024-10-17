import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

const ChangePassword = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: PixelRatio.getPixelSizeForLayoutSize(5)}}>
        <TouchableOpacity activeOpacity={1} onPress={() => {router.back()}} style={{ borderWidth: 1, borderColor: '#B4B4B4', alignSelf: 'flex-start', borderRadius: 6, padding: PixelRatio.getPixelSizeForLayoutSize(2) }}>
          <Ionicons name='arrow-back-outline' size={PixelRatio.getPixelSizeForLayoutSize(7)} color='black' />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.2), flex: 1 }}>Change Password</Text>
      </View>
      <View
        style={{
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
          marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
        }}
      >
        <View>
          <Text style={{ fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular' }}>Current Password</Text>
          <View
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              alignItems: 'center',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              borderRadius: 6,
              gap: PixelRatio.getPixelSizeForLayoutSize(6),
              borderWidth: 1,
              borderColor: '#CCC',
              marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          >
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
                placeholder='Current Password'
                secureTextEntry={!showCurrentPassword}
                autoCapitalize='none'
                style={{
                  fontFamily: 'poppins-regular',
                  flex: 1
                }}
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                activeOpacity={1}
              >
                {
                  showCurrentPassword
                  ? (
                    <Ionicons
                      name='eye-off-sharp'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                  : (
                    <Ionicons
                      name='eye'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <Text style={{ fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular' }}>New Password</Text>
          <View
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              alignItems: 'center',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              borderRadius: 6,
              gap: PixelRatio.getPixelSizeForLayoutSize(6),
              borderWidth: 1,
              borderColor: '#CCC',
              marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          >
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
                placeholder='New Password'
                secureTextEntry={!showNewPassword}
                autoCapitalize='none'
                style={{
                  fontFamily: 'poppins-regular',
                  flex: 1
                }}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={1}
              >
                {
                  showNewPassword
                  ? (
                    <Ionicons
                      name='eye-off-sharp'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                  : (
                    <Ionicons
                      name='eye'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <Text style={{ fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular' }}>New Password Confirmation</Text>
          <View
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'row',
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              alignItems: 'center',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              borderRadius: 6,
              gap: PixelRatio.getPixelSizeForLayoutSize(6),
              borderWidth: 1,
              borderColor: '#CCC',
              marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          >
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
                placeholder='New Password Confirmation'
                secureTextEntry={!showNewPasswordConfirmation}
                autoCapitalize='none'
                style={{
                  fontFamily: 'poppins-regular',
                  flex: 1
                }}
              />
              <TouchableOpacity
                onPress={() => setShowNewPasswordConfirmation(!showNewPasswordConfirmation)}
                activeOpacity={1}
              >
                {
                  showNewPasswordConfirmation
                  ? (
                    <Ionicons
                      name='eye-off-sharp'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                  : (
                    <Ionicons
                      name='eye'
                      size={PixelRatio.getPixelSizeForLayoutSize(6.5)}
                      color='#919191'
                    />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[Colors.PRIMARY, Colors.SECONDARY]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            marginTop: PixelRatio.getPixelSizeForLayoutSize(12),
            borderRadius: 100,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4)
            }}
          >
            <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', textAlign: 'center' }}>Save Changes</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export default ChangePassword