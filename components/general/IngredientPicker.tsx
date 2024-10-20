import { PixelRatio, View } from 'react-native'
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]

const DropdownComponent = () => {
  const [value, setValue] = useState('')

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
        labelField="label"
        valueField="value"
        placeholder='Tomato'
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value)
        }}
      />
    </View>
  )
}

export default DropdownComponent