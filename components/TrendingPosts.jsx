import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native';
import React, { useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import icons from '../constants/icons';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.85
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.85
  }
}

const TrendingVideo = ({activeItem, item: {thumbnail, $id, video}}) => {
  const [play, setPlay] = useState(false);

  if (!activeItem) return;
  return (
    <Animatable.View 
      className='mr-2'
      animation={activeItem === $id ? zoomIn : zoomOut}
      duration={400}
    >
      {
        play ? (
          <Video 
            source={{ uri: video }}
            resizeMode={ResizeMode.COVER}
            style={{width: 210, height: 270, borderRadius: 12}}
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
            className='relative justify-center items-center rounded-2xl'
            onPress={() => setPlay(true)}
          >
            <ImageBackground
              source={{uri: thumbnail}}
              resizeMode='cover'
              className='h-[260px] w-[210px] overflow-hidden rounded-[12px]'
            />
            <Image 
              source={icons.play}
              resizeMode='contain'
              className='w-12 h-12 absolute'
            />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const TrendingPosts = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts?.[1].$id);

  const viewableItemsChanged = ({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }

  return (
    <FlatList 
      className='mb-10'
      data={posts || []}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <TrendingVideo activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{x: 150}}
      horizontal
    />
  )
}

export default TrendingPosts;