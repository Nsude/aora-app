import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, containerStyles, textStyles, onPress, isLoading}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={"0.7"}
      className={`bg-secondary rounded-xl min-h-[62px] self-center justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary ${textStyles}`}>{title || "Custom Button"}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;