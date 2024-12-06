import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import icons from '../constants/icons';
import { router, usePathname } from 'expo-router';

const SearchInput = ({placeholder = 'type here', boxStyles, initialQuery}) => {
  const pathname = usePathname();
  const [isFocused, setisFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  const search = () => {
    if (!query) {
      return Alert.alert("Invalid Search", "type what you'd like to search");
    }

    if (pathname.startsWith('/search')) {
      router.setParams({query});
    } else {
      router.push(`search/${query}`);
    };
  }

  return (
    <View>
      <View className={`h-[60px] w-100% justify-center bg-black-100 rounded-xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} flex-row items-center ${boxStyles}`}>
        <TextInput 
          className='flex-1 px-4 text-white font-psemibold'
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholder={placeholder}
          placeholderTextColor={'#cdcdcd'}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />

        <TouchableOpacity
          onPress={search} 
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