import { db } from '@/config/firebaseConfig'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Image, Animated, TextInput, PixelRatio, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'

interface IProps {
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  chefId: string
  dishId: string
  toggleCompleteBtnOverlay: () => void
  slideAnim: any
}

const Rate = ({ setIsComplete, userId, chefId, dishId, toggleCompleteBtnOverlay, slideAnim }: IProps) => {
  const [star, setStar] = useState(0)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClickStar = (kind: string, idx: number) => {
    const formattedIdx = idx + 1
    if (kind === 'colored') {
      setStar(formattedIdx)
    } else {
      setStar(star + formattedIdx)
    }
  }

  const handleSubmitRating = async() => {
    setLoading(true)
    if (star < 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Field was not filled completely',
        textBody: 'Please provide dish rating'
      })
      setLoading(false)
      return
    }

    if (!description) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Field was not filled completely',
        textBody: 'Please provide rating description'
      })
      setLoading(false)
      return
    }

    await addDoc(collection(db, 'Rating'), {
      userId,
      dishId,
      star,
      description,
      chefId,
      createdAt: new Date()
    })

    await addDoc(collection(db, 'Completed'), {
      userId,
      dishId,
    })
    
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Dish marked as complete',
      textBody: 'Congratulation on completing your dish'
    })

    setIsComplete(true)

    toggleCompleteBtnOverlay()
    setLoading(false)
  }

  const handleSkip = async() => {
    await addDoc(collection(db, 'Completed'), {
      userId,
      dishId,
    })
    
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Dish marked as complete',
      textBody: 'Congratulation on completing your dish'
    })

    setIsComplete(true)

    toggleCompleteBtnOverlay()
  }

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
              {
                Array.from({ length: star }).map((_, idx) => (
                  <TouchableOpacity onPress={() => handleClickStar('colored', idx)} activeOpacity={1}>
                    <Image key={idx} source={require('./../../assets/images/icons/colored/star.png')} style={{ width: 45, height: 45 }} />
                  </TouchableOpacity>
                ))
              }
              {
                Array.from({ length: 5 - star }).map((_, idx) => (
                  <TouchableOpacity onPress={() => handleClickStar('grayscale', idx)} activeOpacity={1}>
                    <Image key={idx} source={require('./../../assets/images/icons/grayscale/star.png')} style={{ width: 45, height: 45 }} />
                  </TouchableOpacity>
                ))
              }
            </View>
            <TextInput
              value={description}
              onChangeText={e => setDescription(e)}
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
              <TouchableOpacity disabled={loading} onPress={handleSubmitRating} activeOpacity={1}>
                <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', textAlign: 'center' }}>
                  {
                    loading
                    ? <ActivityIndicator color='#fff' />
                    : 'Submit'
                  }
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={handleSkip} activeOpacity={1} style={{ marginTop: 8 }}>
              <Text style={{ color: '#A0A0A0', fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale() }}>Skip for now</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Rate