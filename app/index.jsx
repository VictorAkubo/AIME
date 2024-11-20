import React, { useContext } from "react"
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link, Redirect, router } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import icons from '../constants/icons'
import CustomButton from "../components/CustomButton"
import { useGlobalContext } from '../context/globalProvider';

import "../global.css"
import { DarkContext } from "../context/darkContext";

export default function App() {
    const { isLoggedIn, setIsLoggedIn, user, setUser, isLoading } = useGlobalContext()
  const { isLight, setIsLight } = useContext(DarkContext)

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className={`${isLight ? "bg-gray-100" : "bg-primary"} h-full`}>
      <TouchableOpacity onPress={() => setIsLight(!isLight)} className={`h-5 w-5 ${isLight ? "text-primary" : "text-gray-100"}`}>
        <Image
          source={isLight ? icons.black : icons.white}
          resizeMode="contain"
          className="w-4 h-4"
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5 ">
            <Text className={`text-3xl ${isLight ? "text-primary" : "text-gray-100"} font-bold text-center`}>
              Discover Endless Possibilities with {" "} <Text className="text-secondary-200">AIME</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute mt-2 mr-8"
              resizeMode="contain" />
          </View>
          <Text className={`text-sm font-pregular ${isLight ? "text-gray-100" : "text-primary"} mt-7 text-center`}>Were Creativity meets innovation: embark on a journey of limitless exploration with AIME</Text>
          <CustomButton
            title="Continue with email"
            handlePress={() => { router.push('/sign-in') }}
            containerStyles="w-full mt-7" />

        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}