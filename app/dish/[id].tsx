import { View, Text, Appearance, StatusBar, TouchableOpacity, PixelRatio, ScrollView, Dimensions, Animated } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import Ingredients from '@/components/dish/Ingredients'
import Instruction from '@/components/dish/Instruction'
import Review from '@/components/dish/Review'
import Header from '@/components/dish/Header'
import Detail from '@/components/dish/Detail'
import Rate from '@/components/dish/Rate'
import { useLocalSearchParams } from 'expo-router'
import { DocumentData } from 'firebase/firestore'
import { getDishById } from '@/utils/function'

const DishDetail = () => {
  const { id } = useLocalSearchParams()
  const [dishDetail, setDishDetail] = useState<DocumentData | null>(null)

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const [isReviewsClicked, setIsReviewsClicked] = useState(false)
  const [isCompleteBtnClicked, setIsCompleteBtnClicked] = useState(false)

  const screenHeight = Dimensions.get('window').height
  const slideAnim = useRef(new Animated.Value(screenHeight)).current

  const toggleCompleteBtnOverlay = () => {
    if (isCompleteBtnClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true
      }).start(() => setIsCompleteBtnClicked(false))
    } else {
      setIsCompleteBtnClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }

  const toggleReviewsOverlay = () => {
    if (isReviewsClicked) {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true
      }).start(() => setIsReviewsClicked(false))
    } else {
      setIsReviewsClicked(true)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])
  
  useEffect(() => {
    const getDishData = async(id: string) => {
      const result = await getDishById(id)
      setDishDetail(result)
    }

    if (id)
      getDishData(id as string)
  }, [id])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor={theme === 'dark' ? '#000' : '#fff'} />
      <Header dish={dishDetail} />
      <Detail dish={dishDetail} toggleReviewsOverlay={toggleReviewsOverlay} />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Ingredients dish={dishDetail} />
          <Instruction dish={dishDetail} />
          <LinearGradient
            colors={[Colors.PRIMARY, Colors.SECONDARY]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
              borderRadius: 100,
              paddingVertical: 10,
              marginBottom: PixelRatio.getPixelSizeForLayoutSize(10)
            }}
          >
            <TouchableOpacity activeOpacity={1} onPress={toggleCompleteBtnOverlay}>
              <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', textAlign: 'center' }}>Mark as Complete</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>

      {
        isCompleteBtnClicked &&
        <Rate
          toggleCompleteBtnOverlay={toggleCompleteBtnOverlay}
          slideAnim={slideAnim}
        />
      }

      {
        isReviewsClicked &&
        <Review
          toggleReviewsOverlay={toggleReviewsOverlay}
          slideAnim={slideAnim}
        />
      }
    </SafeAreaView>
  )
}

export default DishDetail