import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../../constants/images';
import SearchInput from '../../components/SearchInput';
import TrendingPosts from '../../components/TrendingPosts';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getTrendingVideos } from '../../lib/appwrite';
import { useAppwrite } from '../../hooks/useAppwrite';
import VideoFeed from '../../components/VideoFeed';

const Home = () => {
  const { data: posts, refetchData } = useAppwrite(getAllPosts);
  const { data: trendingVideos } = useAppwrite(getTrendingVideos);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-primary min-h-[95vh] flex-1'>
      <FlatList 
        className='min-h-[100%]'
        contentContainerStyle={{flexGrow: 1}}
        data={posts?.documents}
        keyExtractor={(item) => item.$id || new Date().getTime()}
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='flex-row my-5 justify-between items-center'>
              <View>
                <Text className='text-gray-100 text-sm font-pregular mb-1'>Welcome Back</Text>
                <Text className='text-white text-2xl font-psemibold'>Malik</Text>
              </View>
              <View>
                <Image 
                  source={images.logoSmall}
                  resizeMode='contain'
                  className='w-11 h-11'
                />
              </View>
            </View>

            <SearchInput placeholder='search for a video topic'/>
            <View className='mt-10 mb-5'>
              <Text className='text-gray-100 font-pregular text-lg'>
                Trending Videos
              </Text>
            </View>

            <TrendingPosts posts={trendingVideos?.documents} />
          </View>

        )}
        renderItem={({item}) => (
          <VideoFeed video={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title={'No videos available'}
            subtitle={'Be the first to upload a video'}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home;