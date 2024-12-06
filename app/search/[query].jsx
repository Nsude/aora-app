import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import {searchPosts } from '../../lib/appwrite';
import { useAppwrite } from '../../hooks/useAppwrite';
import VideoFeed from '../../components/VideoFeed';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const {query} = useLocalSearchParams();
  const { data: matchedPosts, refetchData } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetchData();
  }, [query])

  return (
    <SafeAreaView className='bg-primary min-h-[95vh] flex-1'>
      <FlatList 
        className='min-h-[100%]'
        contentContainerStyle={{flexGrow: 1}}
        data={matchedPosts?.documents}
        keyExtractor={(item) => item.$id || new Date().getTime()}
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='mt-4'>
              <Text className='text-gray-100 text-sm font-pregular mb-1'>Search results</Text>
              <Text className='text-white text-xl font-psemibold'>{query}</Text>
            </View>

            <View className='mt-6 mb-10'>
              <SearchInput initialQuery={query} placeholder='search for a video topic'/>
            </View>
          </View>

        )}
        renderItem={({item}) => (
          <VideoFeed video={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title={'No videos available'}
            subtitle={'No videos found for this search'}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search;