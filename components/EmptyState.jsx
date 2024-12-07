import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '../constants/images';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const EmptyState = ({title, subtitle, cta, link}) => {
  return (
    <View className='items-center px-6'>
      <Image 
        source={images.empty}
        resizeMode='contain'
        className='w-[270px] h-[215px]'
      />
      <View className='items-center mb-6'>
        <Text className='text-white text-2xl font-psemibold'>{title}</Text>
        <Text className='text-gray-100 text-sm font-pregular mb-1'>{subtitle}</Text>
      </View>
      
      <CustomButton 
        title={cta || 'Create Video'}
        containerStyles={'w-full'}
        onPress={() => router.push(`/${link || 'create'}`)}
      />
    </View>
  )
}

export default EmptyState;