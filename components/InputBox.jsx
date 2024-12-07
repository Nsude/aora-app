import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputBox = ({title, handleTextChange, placeholder, value}) => {
  const [isFocused, setisFocused] = useState(false);

  return (
    <View className='mb-8'>
      <Text className='text-gray-100 font-pmedium text-[16px] mb-3'>{title}</Text>
      <View className={`h-16 w-full justify-center bg-black-100 rounded-xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput 
          className='px-3 text-white font-psemibold'
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />
      </View>
    </View>
  )
}

export default InputBox;