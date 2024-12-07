import { View, Text, ScrollView, TextInput, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';

import icons from '../../constants/icons';
import { ResizeMode, Video } from 'expo-av';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../contexts/GlobalContext';

const Create = () => {
  const [form, setForm] = useState({
    title: '', 
    video: '',
    thumbnail: '',
    prompt: '',
  })
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useGlobalContext();

  const publishVideo = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Error", "Please fill all fields");
    }
    
    setIsLoading(true);
    try {
      await createVideo(
        {...form, userId: user.$id}
      );

      Alert.alert("Success", "Video uploaded successfully");
      router.push('/home');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: '', 
        video: '', 
        thumbnail: '', 
        prompt: ''
      })

      setIsLoading(false);
    }
  }

  const selectMediaFile = async (mediaType) => {
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaType === 'image' ? ['images'] : ['videos'],
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        mediaType === 'image' ?
        setForm({...form, thumbnail: result.assets[0]}) :
        setForm({...form, video: result.assets[0]})
      }
      
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className='min-h-[95vh] bg-primary w-full '>
      <KeyboardAwareScrollView contentContainerStyle={{height: 'full'}}>
        <View className='px-4 mt-8 h-fit w-full pb-[30px]'>
          <Text className='text-white text-3xl font-psemibold mb-10'>Upload Video</Text>
          
          {/* loading indicator */}
          {
            isLoading ? (
              <View className='absolute z-10 h-full w-full justify-center items-center self-center'>
                <ActivityIndicator size='large' color={'#CDCDE0'} />
              </View>
            ) : ''
          }

          <View style={isLoading ? {opacity: 0.5, pointerEvents: 'none'} : {opacity: 1, pointerEvents: 'auto'}}>
           <InputBox 
            title={'Video Title'}
            placeholder={'give your video a catchy title'}
            value={form.title}
            handleTextChange={(e) => setForm({...form, title: e})}
           />
           {/* Video Upload */}
           <View className='mb-8'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-gray-100 text-[16px] font-pmedium mb-3'>Upload Video</Text>
              {
                form.video ? (
                  <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => setForm({...form, video: ''})}
                  >
                    <Text className='text-gray-100 text-sm font-pmedium'>Clear</Text>
                  </TouchableOpacity>
                ) : ""
              }
            </View>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => selectMediaFile('video')}
              className='h-52 w-full bg-black-100 items-center justify-center rounded-lg overflow-hidden'
            >
              {
                form.video ? (
                  <Video 
                    source={{uri: form.video.uri}}
                    resizeMode={ResizeMode.CONTAIN}
                    style={{width: 400, height: 210}}
                    useNativeControls
                    shouldPlay
                    isLooping
                  />
                ) : (
                  <View className='p-4 border-[1px] rounded-xl border-secondary-200/50 border-dashed'>
                    <Image 
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-8 h-8'
                    />
                  </View>
                )
              }
            </TouchableOpacity >
           </View>

           {/* Thumbnail */}
           <View className='mb-8'>
            <View className='flex-row justify-between items-center'>
                <Text className='text-gray-100 text-[16px] font-pmedium mb-3'>Thumbnail Image</Text>
                {
                  form.thumbnail ? (
                    <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={() => setForm({...form, thumbnail: ''})}
                    >
                      <Text className='text-gray-100 text-sm font-pmedium'>Clear</Text>
                    </TouchableOpacity>
                  ) : ""
                }
              </View>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => selectMediaFile('image')}
              className='h-fit w-full bg-black-100 items-center justify-center rounded-lg'
            >
              {
                form.thumbnail ? (
                  <Image 
                    source={{uri: form.thumbnail.uri}}
                    resizeMode='cover'
                    className='w-full h-40 rounded-lg'
                  />
                ) : (
                  <View className='flex-row h-16 justify-center items-center gap-2'>
                    <Image 
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-5 h-5'
                    />
                    <Text className='text-gray-100 opacity-50 font-pmedium'>Choose a file</Text>
                  </View>
                )
              }
            </TouchableOpacity >
           </View>

           <InputBox 
            title={'AI Prompt'}
            placeholder={'the AI prompt of your video'}
            value={form.prompt}
            handleTextChange={(e) => setForm({...form, prompt: e})}
           />

           <CustomButton 
            title={'Sumbit & Publish'}
            containerStyles={'w-full'}
            onPress={publishVideo}
            isLoading={isLoading}
           />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Create;