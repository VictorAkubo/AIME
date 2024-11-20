import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { router } from "expo-router"
import { images, icons } from "../constants"
import CustomButton from "./CustomButton"
import { DarkContext } from '../context/darkContext'
const EmptyState = ({ title, subtitle }) => {
    const { isLight } = useContext(DarkContext)
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain' />
            <Text className={`text-xl mt-2 text-center font-psemibold ${isLight ? "text-primary" : "text-gray-100"}`}>{title}</Text>
            <Text className={`font-pmedium text-sm ${isLight ? "text-primary" : "text-gray-100"}`}>{subtitle}</Text>
            <CustomButton title="create video" handlePress={() => router.push('/create')} containerStyles="w-full my-5" />
        </View>
    )
}

export default EmptyState