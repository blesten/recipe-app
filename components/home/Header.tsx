import { View, Text, Image, PixelRatio } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { getGreeting, getUserData } from '@/utils/function'
import { useEffect, useState } from 'react'
import { DocumentData } from 'firebase/firestore'

const Header = () => {
  const [user, setUser] = useState<DocumentData | null>(null)
  
  useEffect(() => {
    const getUser = async() => {
      const result = await getUserData()
      setUser(result!.data)
    }

    getUser()
  }, [])

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          gap: PixelRatio.getPixelSizeForLayoutSize(1.3)
        }}
      >
        <Text style={{ color: '#A5A5A5', fontFamily: 'poppins-regular', fontSize: 15 * PixelRatio.getFontScale() }}>{getGreeting()},</Text>
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 24 * PixelRatio.getFontScale() }}>
          {user && user.name}
        </Text>
      </View>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{ borderRadius: 8 }}
      >
        <View
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(17),
            height: PixelRatio.getPixelSizeForLayoutSize(17),
            justifyContent: 'center',
            paddingTop: user && user.avatar ? 0 : PixelRatio.getPixelSizeForLayoutSize(1),
            alignItems: 'center'
          }}
        >
          {
            user && user.avatar
            ? <Image source={{ uri: user.avatar }} style={{ width: PixelRatio.getPixelSizeForLayoutSize(17), height: PixelRatio.getPixelSizeForLayoutSize(17), borderRadius: 8, borderWidth: 1, borderColor: '#DADADA' }} />
            : (
              <Text style={{ color: '#fff', fontFamily: 'poppins-medium', fontSize: 20 * PixelRatio.getFontScale(), letterSpacing: 1 }}>
                {user && (user.name.trim().split(' ').length === 1 ? `${user.name.trim().split(' ')[0][0]}` : `${user.name.trim().split(' ')[0][0]} ${user.name.trim().split(' ')[user.name.trim().split(' ').length - 1][0]}`)}
              </Text> 
            )
          }
        </View>
      </LinearGradient>
    </View>
  )
}

export default Header