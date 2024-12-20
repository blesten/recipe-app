import { View, Text, PixelRatio } from 'react-native'
import { Colors } from '@/constants/Colors'
import { DocumentData } from 'firebase/firestore'

interface IProps {
  dish: DocumentData | null
}

const Instruction = ({ dish }: IProps) => {
  return (
    <View style={{ paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10), marginTop: PixelRatio.getPixelSizeForLayoutSize(10) }}>
      <Text style={{ fontFamily: 'poppins-semibold', fontSize: 18 * PixelRatio.getFontScale() }}>Cooking Instruction</Text>
      <View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(7) }}>
        {
          (dish && dish.instruction) &&
          dish.instruction.map((item: string, idx: number) => (
            <View key={idx} style={{ backgroundColor: Colors.ACCENT, borderRadius: 5, paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(6), paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4), marginBottom: PixelRatio.getPixelSizeForLayoutSize(10) }}>
              <Text style={{ fontFamily: 'poppins-semibold', fontSize: 16 * PixelRatio.getFontScale(), color: Colors.PRIMARY }}>Step {idx + 1}</Text>
              <Text style={{ fontFamily: 'poppins-regular', textAlign: 'justify', fontSize: 13 * PixelRatio.getFontScale(), lineHeight: 21, marginTop: PixelRatio.getPixelSizeForLayoutSize(4) }}>
                {item}
              </Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default Instruction