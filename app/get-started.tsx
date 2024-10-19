import { View, Text, SafeAreaView, PixelRatio, StatusBar, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const GetStarted = () => {
  const router = useRouter()

  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={Colors.PRIMARY}
      />
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          height: '100%',
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
            Enjoy
          </Text>
          <Text
            style={{
              fontFamily: 'literata-semibold',
              color: '#fff',
              fontSize: 48 * PixelRatio.getFontScale()
            }}>
            Cooking
          </Text>
        </View>
        <Text
          style={{
            fontFamily: 'poppins-regular',
            color: '#fff',
            marginTop: PixelRatio.getPixelSizeForLayoutSize(8),
            fontSize: 15 * PixelRatio.getFontScale(),
            lineHeight: PixelRatio.getPixelSizeForLayoutSize(10)
          }}>
          Delicious and detailed restaurant recipes on your phone
        </Text>
        <Image
          style={{
            marginTop: PixelRatio.getPixelSizeForLayoutSize(17),
            width: '90%',
            objectFit: 'contain',
            marginHorizontal: 'auto'
          }}
          source={require('./../assets/images/get_started.png')}
        />
        <TouchableOpacity
          onPress={() => router.push('/sign-in')}
          activeOpacity={.7}
          style={{
            width: '100%',
            backgroundColor: Colors.SECONDARY,
            borderRadius: 50,
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
            marginTop: PixelRatio.getPixelSizeForLayoutSize(16)
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
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default GetStarted