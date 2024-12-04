import { Image, ScrollView, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../constants/images';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';

import {useGlobalContext} from '../contexts/GlobalContext';

const Index = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href={'/home'} />;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className='items-center justify-center w-full min-h-[85vh] px-4'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px]'
          />

          <Image 
            source={images.cards}
            resizeMode='contain'
            className='max-w-[380px] w-full h-[300px]'
          />
          <View className='relative mt-5'>
            <Text className='text-white font-pbold text-3xl text-center'>
              Discover Endless Possibilities with {''}
              <Text className=' relative text-secondary-200'>Aora</Text>
            </Text>
            <Image 
              source={images.path}
              resizeMode='contain'
              className='absolute w-[80px] h-[15px] right-0 bottom-0 z-[-1]'
            />
          </View>
          <Text className='font-pregular text-sm text-gray-100 mt-5 text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>

          <CustomButton 
            onPress={() => router.push('/sign-in')}
            title={"Continue with Email"}
            containerStyles={'w-full mt-10'}
          />
        </View>

        <StatusBar backgroundColor='#161722' style='light' />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Index;