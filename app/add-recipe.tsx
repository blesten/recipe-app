import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect, useRef } from 'react'
import { View, Image, Text, Appearance, PixelRatio, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6'
import Tab from '@/components/general/Tab'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/build/Octicons'
import { LinearGradient } from 'expo-linear-gradient'
import IngredientPicker from '@/components/general/IngredientPicker'

const AddRecipe = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())
  const [image, setImage] = useState('')

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
      <View style={{ height: PixelRatio.getPixelSizeForLayoutSize(50), backgroundColor: '#ccc', overflow: 'hidden', paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <Image
          source={require('./../assets/images/saved.png')} style={{ position: 'absolute', top: 0, marginTop: -7 }}
        />
        <View style={{ flex: 1, justifyContent: 'center', gap: 4, marginTop: -25 }}>
          <Text style={{ color: '#fff', fontFamily: 'poppins-semibold', fontSize: 20 * PixelRatio.getFontScale() }}>Create Recipe</Text>
          <Text style={{ color: '#fff', fontFamily: 'poppins-regular', fontSize: 14 * PixelRatio.getFontScale() }}>Create and share your recipe to everyone</Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6),
            paddingVertical: PixelRatio.getPixelSizeForLayoutSize(8)
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: PixelRatio.getPixelSizeForLayoutSize(5) }}>
            <View
              style={{
                width: PixelRatio.getPixelSizeForLayoutSize(40),
                height: PixelRatio.getPixelSizeForLayoutSize(40),
                borderRadius: 10,
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
                  backgroundColor: '#ddd',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {
                  image
                  ? <Image source={{ uri: image }} style={{ borderRadius: 100, width: PixelRatio.getPixelSizeForLayoutSize(34), height: PixelRatio.getPixelSizeForLayoutSize(34) }} />
                  : <FontAwesome6 name='bowl-food' size={PixelRatio.getPixelSizeForLayoutSize(18)} color='#A0A0A0' />
                }
              </View>
            </View>
            <TouchableOpacity activeOpacity={1} onPress={onImagePick}>
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 13 * PixelRatio.getFontScale(), color: '#2c5cde' }}>+ Upload Image</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
            <Text style={{ fontFamily: 'poppins-regular' }}>Title</Text>
            <TextInput
              placeholder='Dish title'
              style={{
                fontFamily: 'poppins-regular',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: PixelRatio.getPixelSizeForLayoutSize(4),
                marginTop: PixelRatio.getPixelSizeForLayoutSize(5)
              }}
            />
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
            <Text style={{ fontFamily: 'poppins-regular' }}>Cooking Duration (minutes)</Text>
            <TextInput
              keyboardType='decimal-pad'
              placeholder='Cooking duration'
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: PixelRatio.getPixelSizeForLayoutSize(4),
                marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
                fontFamily: 'poppins-regular'
              }}
            />
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
            <Text style={{ fontFamily: 'poppins-regular' }}>Dish Calories (Kall)</Text>
            <TextInput
              keyboardType='decimal-pad'
              placeholder='Dish calories'
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: PixelRatio.getPixelSizeForLayoutSize(4),
                marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
                fontFamily: 'poppins-regular'
              }}
            />
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
            <Text style={{ fontFamily: 'poppins-regular' }}>Serving</Text>
            <TextInput
              keyboardType='numeric'
              placeholder='Serving'
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: PixelRatio.getPixelSizeForLayoutSize(4),
                marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
                fontFamily: 'poppins-regular'
              }}
            />
          </View>
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'poppins-regular' }}>Ingredient</Text>
              <TouchableOpacity activeOpacity={1}>
                <Ionicons name='add' size={22} color='black' />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5), flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <IngredientPicker />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 6,
                  padding: PixelRatio.getPixelSizeForLayoutSize(4)
                }}
              >
                <Octicons name="number" size={24} color='#A0A0A0' />  
                <TextInput
                  placeholder='Quantity'
                  keyboardType='number-pad'
                  style={{
                    fontFamily: 'poppins-regular',
                    flex: 1
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <IngredientPicker />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 6,
                    padding: PixelRatio.getPixelSizeForLayoutSize(4)
                  }}
                >
                  <Octicons name="number" size={24} color='#A0A0A0' />
                  <TextInput
                    placeholder='Quantity'
                    keyboardType='number-pad'
                    style={{
                      fontFamily: 'poppins-regular',
                      flex: 1
                    }}
                  />
                </View>
              </View>
              <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(3), flexDirection: 'row', gap: 6 }}>
                <MaterialCommunityIcons name='delete' size={14} color='red' />
                <Text style={{ fontFamily: 'poppins-medium', color: 'red', fontSize: 11 * PixelRatio.getFontScale() }}>Delete ingredient</Text>
              </View>
            </View>
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(8) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'poppins-regular' }}>Cooking Instruction</Text>
                <TouchableOpacity activeOpacity={1}>
                  <Ionicons name='add' size={22} color='black' />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
                <Text style={{ fontFamily: 'poppins-medium' }}>Step 1</Text>
                <TextInput
                  placeholder='Cooking instruction'
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: PixelRatio.getPixelSizeForLayoutSize(4),
                    borderRadius: 6,
                    height: 100,
                    textAlignVertical: 'top',
                    marginTop: PixelRatio.getPixelSizeForLayoutSize(4)
                  }}
                />
              </View>
              <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7) }}>
                <View>
                  <Text style={{ fontFamily: 'poppins-medium' }}>Step 2</Text>
                  <TextInput
                    placeholder='Cooking instruction'
                    style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: PixelRatio.getPixelSizeForLayoutSize(4),
                      borderRadius: 6,
                      height: 100,
                      textAlignVertical: 'top',
                      marginTop: PixelRatio.getPixelSizeForLayoutSize(4)
                    }}
                  />
                </View>
                <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(3), flexDirection: 'row', gap: 6 }}>
                  <MaterialCommunityIcons name='delete' size={14} color='red' />
                  <Text style={{ fontFamily: 'poppins-medium', color: 'red', fontSize: 11 * PixelRatio.getFontScale() }}>Delete cooking instruction</Text>
                </View>
              </View>
            </View>
          </View>
          <LinearGradient
            colors={[Colors.PRIMARY, Colors.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: PixelRatio.getPixelSizeForLayoutSize(3),
              borderRadius: 100,
              marginVertical: PixelRatio.getPixelSizeForLayoutSize(10)
            }}
          >
            <TouchableOpacity activeOpacity={1}>
              <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ marginBottom: PixelRatio.getPixelSizeForLayoutSize(20) }} />
        </ScrollView>
      </View>
      <Tab />
    </SafeAreaView>
  )
}

export default AddRecipe