import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Image, SafeAreaView, TouchableOpacity, PixelRatio } from 'react-native'

const SignOut = () => {
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
            lineHeight: PixelRatio.getPixelSizeForLayoutSize(10)
          }}
        >
          Become a member and smoothly navigate our application
        </Text>
        <Image
          style={{
            marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
            width: '85%',
            objectFit: 'contain',
            marginHorizontal: 'auto'
          }}
          source={require('./../assets/images/sign_up.png')}
        />
        <TouchableOpacity
          activeOpacity={.7}
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 50,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
            marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
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
              fontSize: 14
            }}
          >
            Sign up with Google
          </Text>
        </TouchableOpacity>
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
              fontSize: PixelRatio.getPixelSizeForLayoutSize(4)
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
          onPress={() => router.push('/sign-up-form')}
          activeOpacity={.7}
          style={{
            width: '100%',
            backgroundColor: Colors.SECONDARY,
            borderRadius: 50,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
            marginTop: PixelRatio.getPixelSizeForLayoutSize(9)
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
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SignOut