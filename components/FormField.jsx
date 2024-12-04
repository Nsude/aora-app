import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import icons from '../constants/icons';

const FormField = ({title, placeholder = 'type here', value, handleChangeText, keyboardType}) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setisFocused] = useState(false);

  return (
    <View>
      <Text className='text-white mt-8 mb-3 font-pregular'>{title || 'FormField'}</Text>
      <View className={`h-16 w-full justify-center bg-black-100 rounded-xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row items-center`}>
        <TextInput 
          className='flex-1 px-4 text-white font-psemibold'
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#7b7b8b'}
          secureTextEntry={!showPassword && title === "Password"}
          keyboardType={keyboardType || 'default'}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />

        {
          title === "Password" && 
          <TouchableOpacity
           onPress={() => setshowPassword(!showPassword)} 
           className='mr-3'>
            <Image 
              source={showPassword ? icons.eyeHide : icons.eye} 
              resizeMode='contain'
              className='w-7 '
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default FormField;