import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';

import icons from '../../constants/icons';

const TabIcon = ({icon, focused, name, color}) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text 
        className={`${focused ? 'font-pbold' : 'font-pregular'} w-full text-xs`} 
        style={{color: color}}
        numberOfLines={1}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1, 
          paddingTop: 15,
          borderTopColor: "#232533",
          height: 84
        }
      }}
    >
      <Tabs.Screen 
        name='home'
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              name={'Home'}
              icon={icons.home}
              color={color}
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen 
        name='bookmark'
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              name={'Bookmark'}
              icon={icons.bookmark}
              color={color}
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen 
        name='create'
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              name={'Create'}
              icon={icons.plus}
              color={color}
              focused={focused}
            />
          )
        }}
      />
      
      <Tabs.Screen 
        name='profile'
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              name={'Profile'}
              icon={icons.profile}
              color={color}
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout;