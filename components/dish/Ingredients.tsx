import { View, Text, Image, PixelRatio, FlatList } from 'react-native'
import { DocumentData } from 'firebase/firestore'
import { getIngredientByTitle } from '@/utils/function'
import { useEffect, useState } from 'react'

interface IProps {
  dish: DocumentData | null
}

const Ingredients = ({ dish }: IProps) => {  
  const [formattedIngredients, setFormattedIngredients] = useState<any[]>([])

  useEffect(() => {
    const formatIngredients = async() => {
      const ingr = []
      if (dish && dish.ingredients) {
        for (let i = 0; i < dish.ingredients.length; i++) {
          const ingrDetail = await getIngredientByTitle(dish.ingredients[i].id)
          ingr.push({ ...dish.ingredients[i], icon: ingrDetail.icon, uom: ingrDetail.uom })
        }
      }
      setFormattedIngredients(ingr)
    }

    formatIngredients()
  }, [dish])

  return (
    <View style={{ paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), marginTop: PixelRatio.getPixelSizeForLayoutSize(10) }}>
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Ingredients</Text>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7), flexDirection: 'row', gap: 18 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={formattedIngredients}
          renderItem={({item, index}) => (
            <View
              style={{
                alignItems: 'center',
                marginRight: index !== (dish && dish.ingredients.length - 1) ? 20 : 0,
                width: PixelRatio.getPixelSizeForLayoutSize(23)
              }}
            >
              <View style={{ backgroundColor: '#eaf0ff', width: PixelRatio.getPixelSizeForLayoutSize(22), height: PixelRatio.getPixelSizeForLayoutSize(22), borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: item.icon }} style={{ width: PixelRatio.getPixelSizeForLayoutSize(17), height: PixelRatio.getPixelSizeForLayoutSize(17) }} />
              </View>
              <View style={{ alignItems: 'center', marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                <Text style={{ fontFamily: 'poppins-medium', fontSize: 13 * PixelRatio.getFontScale(), textAlign: 'center' }}>{item.id}</Text>
                <Text style={{ fontFamily: 'poppins-regular', fontSize: 11 * PixelRatio.getFontScale(), color: '#A0A0A0' }}>{item.qty} {item.uom}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default Ingredients