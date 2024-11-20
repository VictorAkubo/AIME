import { View, Text, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { images } from "../../constants"
import CustomButton from "../../components/CustomButton"
import FormField from '../../components/FormField'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async (form) => {
    if (!form.email || !form.password) {
      Alert.alert('Error', "Please fill in all fields")
    } else {
      setIsSubmitting(true)
      try {
        const result = await signIn(form.email, form.password)
        // set it to global state
        router.replace("/home")
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
          < Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to AIME</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton title="sign-in" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
         <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn