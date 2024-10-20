import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, TouchableWithoutFeedback, Image, Animated, TextInput, PixelRatio, TouchableOpacity } from 'react-native'

interface IProps {
  toggleCompleteBtnOverlay: () => void
  slideAnim: any
}

const Rate = ({ toggleCompleteBtnOverlay, slideAnim }: IProps) => {
  return (
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
  )
}

export default Rate