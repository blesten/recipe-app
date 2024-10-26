import { Colors } from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect, useRef } from 'react'
import { View, Image, Text, Appearance, PixelRatio, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Dimensions, Animated, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6'
import Tab from '@/components/general/Tab'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/build/Octicons'
import { LinearGradient } from 'expo-linear-gradient'
import IngredientPicker from '@/components/general/IngredientPicker'
import { addDoc, collection, DocumentData } from 'firebase/firestore'
import { getChefProfileData, getMasterIngredients, getUserData, uploadImage } from '@/utils/function'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { db } from '@/config/firebaseConfig'
import { useRouter } from 'expo-router'

const AddRecipe = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())
  const [image, setImage] = useState('')

  const [title, setTitle] = useState('')
  const [cookingDuration, setCookingDuration] = useState(1)
  const [dishCalories, setDishCalories] = useState(1)
  const [serving, setServing] = useState(1)
  const [ingredients, setIngredients] = useState(
    [
      {
        id: '',
        qty: 1
      }
    ]
  )
  const [cookingInstruction, setCookingInstruction] = useState([''])
  const [masterIngredients, setMasterIngredients] = useState<DocumentData[]>([])

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onImagePick = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    setImage(result?.assets![0].uri)
  }

  const handleAddCookingInstruction = () => {
    const newVal = [...cookingInstruction, '']
    setCookingInstruction(newVal)
  }

  const handleDeleteCookingInstruction = (id: number) => {
    setCookingInstruction(cookingInstruction.filter((_, i) => i !== id))
  }

  const handleChangeCookingInstruction = (e: string, id: number) => {
    const prev = [...cookingInstruction]
    prev[id] = e
    setCookingInstruction(prev)
  }

  const handleAddIngredient = () => {
    const newVal = [...ingredients, { id: '', qty: 1 }]
    setIngredients(newVal)
  }

  const handleDeleteIngredient = (id: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(id, 1)
    setIngredients(newIngredients)
  }

  const handleChangeIngredientValue = (e: string, idx: number) => {
    const prev: any[] = [...ingredients]
    prev[idx] = { id: e, qty: prev[idx].qty }
    setIngredients(prev)
  }

  const handleChangeIngredientQty = (e: number, idx: number) => {
    const prev: any[] = [...ingredients]
    prev[idx] = { id: prev[idx].id, qty: e }
    setIngredients(prev)
  }

  const handleSubmit = async() => {
    setLoading(true)

    if (!image) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed saving recipe',
        textBody: 'Please provide dish image'
      })
      setLoading(false)
      return
    }

    if (!title) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed saving recipe',
        textBody: 'Please provide dish title'
      })
      setLoading(false)
      return
    }

    if (cookingDuration < 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed saving recipe',
        textBody: 'Please provide valid cooking duration'
      })
      setLoading(false)
      return
    }

    if (dishCalories < 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed saving recipe',
        textBody: 'Please provide valid dish calories'
      })
      setLoading(false)
      return
    }

    if (serving < 1) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed saving recipe',
        textBody: 'Please provide valid serving portion'
      })
      setLoading(false)
      return
    }

    const ids = new Set()

    for (const ingredient of ingredients) {
      if (!ingredient.id) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed saving recipe',
          textBody: 'Ingredient shouldn\'t be empty'
        })
        setLoading(false)
        return
      }

      if (ingredient.qty <= 0) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed saving recipe',
          textBody: 'Ingredient quantity should be greater than 0'
        })
        setLoading(false)
        return
      }

      if (ids.has(ingredient.id)) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed saving recipe',
          textBody: 'Same ingredient can\'t be used twice'
        })
        setLoading(false)
        return
      }

      ids.add(ingredient.id)
    }

    for (const instruction of cookingInstruction) {
      if (!instruction) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed saving recipe',
          textBody: 'Cooking instruction can\'t be empty'
        })
        setLoading(false)
        return
      }
    }

    try {
      const imageUrl = await uploadImage(image, 'Dish')

      const userData= await getUserData()

      const chefData = await getChefProfileData(userData?.data.id!)

      await addDoc(collection(db, 'Dish'), {
        title,
        duration: cookingDuration,
        calories: dishCalories,
        serving,
        image: imageUrl,
        ingredients,
        instruction: cookingInstruction,
        createdAt: new Date(),
        chefId: chefData?.data.id,
        userId: userData?.data.id
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Recipe saved successfully',
        textBody: 'Your recipe has been published'
      })

      router.push('/home')
    } catch (err: any) {
      console.log(err)
    }
    
    setLoading(false)
  }

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const getIngredientsData = async() => {
      const result = await getMasterIngredients()
      setMasterIngredients(result)
    }

    getIngredientsData()
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
              value={title}
              onChangeText={e => setTitle(e)}
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
              value={String(cookingDuration)}
              onChangeText={e => setCookingDuration((e as unknown) as number)}
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
              value={String(dishCalories)}
              onChangeText={e => setDishCalories((e as unknown) as number)}
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
              value={String(serving)}
              onChangeText={e => setServing((e as unknown) as number)}
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
          <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(9) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'poppins-regular' }}>Ingredient</Text>
              <TouchableOpacity onPress={handleAddIngredient} activeOpacity={1}>
                <Ionicons name='add' size={22} color='black' />
              </TouchableOpacity>
            </View>
            {
              ingredients.map((item, id) => (
                <View key={id}>
                  <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5), flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <IngredientPicker
                      id={id}
                      data={masterIngredients}
                      ingredients={ingredients}
                      onChange={handleChangeIngredientValue}
                    />
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
                        value={String(ingredients[id].qty)}
                        onChangeText={e => handleChangeIngredientQty((e as unknown) as number, id)}
                        style={{
                          fontFamily: 'poppins-regular',
                          flex: 1
                        }}
                      />
                    </View>
                  </View>
                  {
                    ingredients.length > 1 &&
                    <TouchableOpacity onPress={() => handleDeleteIngredient(id)} activeOpacity={1} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(3), flexDirection: 'row', gap: 6 }}>
                      <MaterialCommunityIcons name='delete' size={14} color='red' />
                      <Text style={{ fontFamily: 'poppins-medium', color: 'red', fontSize: 11 * PixelRatio.getFontScale() }}>Delete ingredient</Text>
                    </TouchableOpacity>
                  }
                </View>
              ))
            }
            <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(9) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'poppins-regular' }}>Cooking Instruction</Text>
                <TouchableOpacity onPress={handleAddCookingInstruction} activeOpacity={1}>
                  <Ionicons name='add' size={22} color='black' />
                </TouchableOpacity>
              </View>
              {
                cookingInstruction.map((item, id) => (
                  <View key={id}>
                    <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
                      <Text style={{ fontFamily: 'poppins-medium' }}>Step {id + 1}</Text>
                      <TextInput
                        placeholder='Cooking instruction'
                        value={cookingInstruction[id]}
                        onChangeText={e => handleChangeCookingInstruction(e, id)}
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
                    {
                      cookingInstruction.length > 1 &&
                      <TouchableOpacity activeOpacity={1} onPress={() => handleDeleteCookingInstruction(id)} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(3), flexDirection: 'row', gap: 6 }}>
                        <MaterialCommunityIcons name='delete' size={14} color='red' />
                        <Text style={{ fontFamily: 'poppins-medium', color: 'red', fontSize: 11 * PixelRatio.getFontScale() }}>Delete cooking instruction</Text>
                      </TouchableOpacity>
                    }
                  </View>
                ))
              }
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
            <TouchableOpacity disabled={loading} onPress={handleSubmit} activeOpacity={1}>
              {
                loading
                ? <ActivityIndicator color='#fff' />
                : (
                  <Text style={{ fontFamily: 'poppins-semibold', color: '#fff', textAlign: 'center' }}>
                    Submit
                  </Text>
                )
              }
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