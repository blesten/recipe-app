import { Colors } from '@/constants/Colors'
import { useRoute } from '@react-navigation/native'
import { Href, router } from 'expo-router'
import { View, Image, PixelRatio, TouchableOpacity } from 'react-native'

const Tab = () => {
  const { name } = useRoute()

  const handlePress = (screen: string) => {
    if (name !== screen)
      router.push(screen as Href)
  }
  
  return (
    <View
      style={{
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(5.5),
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(5)
      }}
    >
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 3,
          borderWidth: 1,
          borderColor: '#eee',
          paddingVertical: PixelRatio.getPixelSizeForLayoutSize(5),
          paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity onPress={() => handlePress('home')} activeOpacity={1}>
          {
            name === 'home'
            ? <Image source={require('./../../assets/images/icons/colored/home.png')} />
            : <Image source={require('./../../assets/images/icons/grayscale/home.png')} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('chart')} activeOpacity={1}>
          {
            name === 'chart'
            ? <Image source={require('./../../assets/images/icons/colored/chart.png')} />
            : <Image source={require('./../../assets/images/icons/grayscale/chart.png')} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('add')} activeOpacity={1}>
          {
            name === 'add'
            ? (
              <View
                style={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 50
                }}
              >
                <Image source={require('./../../assets/images/icons/colored/add.png')} />
              </View>
            )
            : <Image source={require('./../../assets/images/icons/grayscale/add.png')} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('saved')} activeOpacity={1}>
          {
            name === 'saved'
            ? <Image source={require('./../../assets/images/icons/colored/saved.png')} />
            : <Image source={require('./../../assets/images/icons/grayscale/saved.png')} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('profile')} activeOpacity={1}>
          {
            name === 'profile'
            ? <Image source={require('./../../assets/images/icons/colored/profile.png')} />
            : <Image source={require('./../../assets/images/icons/grayscale/profile.png')} />
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Tab