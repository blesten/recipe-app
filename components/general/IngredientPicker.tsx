import { PixelRatio, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { DocumentData } from 'firebase/firestore'
import { useState } from 'react'

interface IProps {
  data: DocumentData[]
  id: number
  ingredients: DocumentData[]
  onChange: (e: string, id: number) => void
}

const DropdownComponent = ({ data, ingredients, id, onChange }: IProps) => {
  const formattedOnChange = (item: DocumentData) => {
    onChange(item.value, id)
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: PixelRatio.getPixelSizeForLayoutSize(4),
        flex: 1
      }}
    >
      <Dropdown
        placeholderStyle={{ fontFamily: 'poppins-regular' }}
        selectedTextStyle={{ fontFamily: 'poppins-regular' }}
        data={data} 
        search={false}
        labelField='label'
        valueField='value'
        placeholder='Select'
        value={ingredients[id].id}
        searchPlaceholder='Search...'
        onChange={item => formattedOnChange(item)}
      />
    </View>
  )
}

export default DropdownComponent