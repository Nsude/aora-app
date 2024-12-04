import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import images from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setform] = useState({email: "", password: ""});
  const [isSubmiting, setisSubmiting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill all fields");
    }

    try {
      setisSubmiting(true);

      const result = await login(form.email, form.password)

      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmiting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary'>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, height: '100%'}}
        keyboardShouldPersistTaps='handled'
        extraScrollHeight={10}>
        <View className='w-full min-h-[85vh] justify-center px-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px] mb-10'
          />

          <Text className='font-pbold text-2xl text-white'>Login</Text>
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
            title={'Login'}
            onPress={submit}
            containerStyles={'w-full mt-10'}
            isLoading={isSubmiting}
          />

          <Text className='font-pregular text-white text-center mt-5'>
            Don't have an account? <Link href={'/sign-up'} className='text-secondary font-pbold'>Sign up</Link>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default SignUp;