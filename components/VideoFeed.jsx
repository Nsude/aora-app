import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from '../constants/icons';
import { ResizeMode, Video } from 'expo-av';

const VideoFeed = ({video: {thumbnail, title, video, creator: {avatar, username}}}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className='px-5 flex-col gap-5 mb-10'>
      <View className='flex-row justify-between items-center '>
        <View className='flex-row gap-2.5 max-w-[75%] items-center'>
          <View className='w-[42px] h-[42px] rounded-full bg-secondary-200 p-0.5'>
            <Image 
              source={{uri: avatar}}
              resizeMode='contain'
              className='w-full h-full rounded-full'
            />
          </View>
          <View>
            <Text className='text-white font-psemibold' numberOfLines={1}>
              {title}
            </Text>
            <Text className='text-gray-100 font-pregular text-sm' numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <Image 
          source={icons.menu} 
          resizeMode='contain'
          className='w-5 h-5'
        />
      </View>

      {/* Thumbnail */}
      {
        play ? (
          <Video 
            source={{ uri: video }}
            resizeMode={ResizeMode.COVER}
            style={{width: 'full', height: 210, borderRadius: 12}}
            shouldPlay
            useNativeControls
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity 
            activeOpacity={0.7}
            className='w-full h-[210px] rounded-[12px] overflow-hidden justify-center items-center'
            onPress={() => setPlay(true)}>
            <Image 
              source={{uri: thumbnail}}
              resizeMode='cover'
              className='w-full h-full opacity-90'
            />
            <Image
              source={icons.play}
              resizeMode='contain'
              className='w-12 h-12 absolute z-10' 
            />
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default VideoFeed;