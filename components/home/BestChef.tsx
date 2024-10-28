import { View, Text, PixelRatio, FlatList } from 'react-native'
import ChefCard from './ChefCard'

interface IProps {
  chef: any[]
}

const BestChef = ({ chef }: IProps) => {
  return (
    <View
      style={{
        marginTop: PixelRatio.getPixelSizeForLayoutSize(12)
      }}
    >
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 22 * PixelRatio.getFontScale() }}>Best Chef</Text>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5), flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
        {
          chef.map((item, index) => (
            <View>
              <ChefCard
                key={index}
                data={item}
              />
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default BestChef