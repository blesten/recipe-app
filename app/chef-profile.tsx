import { View, Text, Appearance, StatusBar, PixelRatio, TouchableOpacity, TextInput, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';

const ChefProfile = () => {
  const [image, setImage] = useState('')
  const [theme, setTheme] = useState(Appearance.getColorScheme())

  const router = useRouter()

  const onImagePick = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    setImage(result?.assets![0].uri)
  }

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
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(1.2), flex: 1 }}>Chef Profile</Text>
      </View>
      <View
        style={{
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5),
          marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: PixelRatio.getPixelSizeForLayoutSize(5) }}>
          <View
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(40),
              height: PixelRatio.getPixelSizeForLayoutSize(40),
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#DADADA',
              padding: PixelRatio.getPixelSizeForLayoutSize(5),
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(34),
                height: PixelRatio.getPixelSizeForLayoutSize(34),
                backgroundColor: Colors.PRIMARY,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {
                image
                ? <Image source={{ uri: image }} style={{ borderRadius: 100, width: PixelRatio.getPixelSizeForLayoutSize(34), height: PixelRatio.getPixelSizeForLayoutSize(34) }} />
                : <Text style={{ color: '#fff', marginTop: PixelRatio.getPixelSizeForLayoutSize(3), fontSize: 36 * PixelRatio.getFontScale(), fontFamily: 'poppins-semibold' }}>JD</Text>
              }
            </View>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={onImagePick}>
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), color: '#2c5cde' }}>+ Upload Image</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <Text style={{ fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular' }}>Name</Text>
          <TextInput
            placeholder='Name'
            autoCapitalize='none'
            style={{
              fontFamily: 'poppins-regular',
              borderWidth: 1,
              borderColor: '#CCC',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              borderRadius: 6,
              marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          />
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12) }}>
          <Text style={{ fontSize: 13 * PixelRatio.getFontScale(), fontFamily: 'poppins-regular' }}>Description</Text>
          <TextInput
            placeholder='Description'
            autoCapitalize='none'
            style={{
              fontFamily: 'poppins-regular',
              borderWidth: 1,
              borderColor: '#CCC',
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
              paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
              borderRadius: 6,
              marginTop: PixelRatio.getPixelSizeForLayoutSize(6)
            }}
          />
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

export default ChefProfile