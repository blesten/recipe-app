import { View, Text, PixelRatio, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import Tab from '@/components/general/Tab'

const profile = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={{ fontFamily: 'poppins-medium', fontSize: 17 * PixelRatio.getFontScale(), textAlign: 'center', marginVertical: PixelRatio.getPixelSizeForLayoutSize(6) }}>My Profile</Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(7) }}>
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
          <View style={{ width: PixelRatio.getPixelSizeForLayoutSize(34), height: PixelRatio.getPixelSizeForLayoutSize(34), backgroundColor: Colors.PRIMARY, borderRadius: 100 }} />
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(6) }}>
          <Text style={{ fontFamily: 'poppins-medium', fontSize: 18 * PixelRatio.getFontScale() }}>John Doe</Text>
          <Text style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(1), color: '#A8A8A8', fontFamily: 'poppins-regular', fontSize: 14 * PixelRatio.getFontScale() }}>test@gmail.com</Text>
        </View>
        <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(12), gap: PixelRatio.getPixelSizeForLayoutSize(7) }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/edit_profile.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Edit Profile</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push('/change-password')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/change_password.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Change Password</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#D3F7FF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/chef_profile.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Chef Profile</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: PixelRatio.getPixelSizeForLayoutSize(7)
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: PixelRatio.getPixelSizeForLayoutSize(20),
                height: PixelRatio.getPixelSizeForLayoutSize(20),
                backgroundColor: '#FFD3D3',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image source={require('./../assets/images/icons/colored/logout.png')} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                flex: 1
              }}  
            >
              <Text style={{ fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale(), color: '#2C2C2C' }}>Log Out</Text>
              <Ionicons name='chevron-forward-outline' size={PixelRatio.getPixelSizeForLayoutSize(9)} color='black' />
            </View>
          </View>
        </View>
      </ScrollView>
      <Tab />
    </SafeAreaView>
  )
}

export default profile