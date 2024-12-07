import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppwrite } from '../../hooks/useAppwrite';
import { getAllPosts, getUserVideos } from '../../lib/appwrite';
import VideoFeed  from '../../components/VideoFeed';
import EmptyState from '../../components/EmptyState';
import icons from '../../constants/icons';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import {useGlobalContext} from '../../contexts/GlobalContext';

const Profile = () => {
  const {user, setUser, setisLoggedIn} = useGlobalContext();
  const {data: userPosts, isLoading, refetchData} = useAppwrite(() => getUserVideos(user.$id));
  const [isRefreshing, setIsRefreshin] = useState(false);

  const formatViews = (number) => {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; // 1.2k
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // 1.2M
    } else {
      return number.toString(); // Below 1k remains the same
    }
  };  

  const onRefresh = async () => {
    setIsRefreshin(true);
    await refetchData();
    setIsRefreshin(false);
  }

  const logOut = async () => {
    try {
      await signOut();
      setUser(null);
      setisLoggedIn(false);
      router.replace('sign-in');
    } catch (error) {
      Alert.alert("Error signing out", error);
    }
  }

  return (
    <SafeAreaView className='min-h-[95vh] w-full bg-primary'>
      <FlatList 
        data={userPosts?.documents}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className='my-10'>
            <TouchableOpacity 
              activeOpacity={0.7}
              className='w-full items-end px-5'
              onPress={logOut}>
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-7 h-7'
              />
            </TouchableOpacity>
            <View className='flex-col gap-2 items-center self-center mb-5'>
              <View className='w-[42px] h-[42px] rounded-full bg-secondary-200 p-0.5'>
                <Image 
                  source={{uri: user.avatar}}
                  resizeMode='contain'
                  className='w-full h-full rounded-full'
                />
              </View>
              <Text className='text-white text-2xl font-psemibold'>
                {user.username || 'username'}
              </Text>
            </View>
            <View className='flex-row gap-10 justify-center'>
              <View className='flex-col items-center'>
                <Text className='text-white text-2xl font-psemibold'>
                  {userPosts?.documents.length || 0}
                </Text>
                <Text className='text-white text-sm font-pregular'>Posts</Text>
              </View>
              <View className='flex-col items-center'>
                <Text className='text-white text-2xl font-psemibold'>
                  {formatViews((userPosts?.documents.length * 433))}
                </Text>
                <Text className='text-white text-sm font-pregular'>Views</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({item}) => (
          <VideoFeed video={item} />
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title={'No posts available'}
            subtitle={'create your first post now 😉'}
            cta={'Back to explore'}
            link={'home'}
          />
        )}
        refreshControl={(
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        )}
      />

    </SafeAreaView>
  )
}

export default Profile;