import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUser, getCurrentUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../contexts/GlobalContext';

const SignIn = () => {
  const [form, setform] = useState({username: '', email: '', password: ''});
  const [isSubmiting, setisSubmiting] = useState(false);
  const { setUser, setisLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      return Alert.alert("Error", "Please fill all fields");
    }

    setisSubmiting(true);
    try {
      await createUser(form.email, form.password, form.username);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setisLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.message || 'Something went wrong');
    } finally {
      setisSubmiting(false);
    }

  }

  return (
    <SafeAreaView className='w-full bg-primary'>
      <KeyboardAwareScrollView 
      contentContainerStyle={{flexGrow: 1, height: '100%'}}
      keyboardShouldPersistTaps='handled'
      extraScrollHeight={10}>
        <View className='w-full min-h-[85vh] justify-center px-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px] mb-10'
          />

          <Text className='font-pbold text-2xl text-white'>Sign Up</Text>
          <FormField 
            title={'Username'}
            handleChangeText={(e) => setform((prev) => ({...prev, username: e}))}
            placeholder='your username'
            value={form.username}
          />

          <FormField 
            title={'Email'}
            handleChangeText={(e) => setform((prev) => ({...prev, email: e}))}
            placeholder='your@email.com'
            value={form.email}
            keyboardType={'email-address'}
          />

          <FormField 
            title={'Password'}
            handleChangeText={(e) => setform((prev) => ({...prev, password: e}))}
            placeholder='your password'
            value={form.password}
          />
          
          <CustomButton 
            title={'Sign Up'}
            onPress={submit}
            containerStyles={'w-full mt-10'}
            isLoading={isSubmiting}
          />

          <Text className='font-pregular text-white text-center mt-5'>
            Already got an account? <Link href={'/sign-in'} className='text-secondary font-pbold'>Login</Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default SignIn;