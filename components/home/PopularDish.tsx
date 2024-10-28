import { View, Text, PixelRatio, TouchableOpacity, FlatList } from 'react-native'
import DishCard from './DishCard'

interface IProps {
  dish: any[]
}

const PopularDish = ({ dish }: IProps) => {

  return (
    <View
      style={{
        marginTop: PixelRatio.getPixelSizeForLayoutSize(12)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 22 * PixelRatio.getFontScale() }}>Popular Dish</Text>
      </View>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(5) }}>
        <FlatList
          data={dish}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <DishCard
              key={index}
              data={item}
              idx={index}
              len={dish.length}
            />
          )}
        />
      </View>
    </View>
  )
}

export default PopularDish