import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import icons from '../constants/icons';

const SearchInput = ({placeholder = 'type here', value, handleChangeText, keyboardType, boxStyles}) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setisFocused] = useState(false);

  return (
    <View>
      <View className={`h-[60px] w-100% justify-center bg-black-100 rounded-xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row items-center ${boxStyles}`}>
        <TextInput 
          className='flex-1 px-4 text-white font-psemibold'
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          keyboardType={keyboardType || 'default'}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />

        <TouchableOpacity
          onPress={() => setshowPassword(!showPassword)} 
          className='mr-4'>
          <Image 
            source={icons.search} 
            resizeMode='contain'
            className='w-6 h-6'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SearchInput;