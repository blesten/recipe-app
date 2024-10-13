import { View, Text, PixelRatio } from 'react-native'
import ChefCard from './ChefCard'

const BestChef = () => {
  return (
    <View
      style={{
        marginTop: PixelRatio.getPixelSizeForLayoutSize(12)
      }}
    >
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 22 * PixelRatio.getFontScale() }}>Best Chef</Text>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5), flexDirection: 'row', gap: 14 }}>
        <ChefCard />
        <ChefCard />
        <ChefCard />
        <ChefCard />
        <ChefCard />
      </View>
    </View>
  )
}

export default BestChef