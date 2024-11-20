import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from "../constants"
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const [query, setQuery] = useState(initialQuery || '')
    const pathName = usePathname()
    return (
        <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput className="flex-1 text-white font-pregular text-base mt-0.5" value={query} placeholder={"Search for avideo topic"} placeholderTextColor="#cdcde0" onChangeText={(e) => setQuery(e)} />

            <TouchableOpacity onPress={() => {
                if (!query) {
                    Alert.alert('Missing query', 'Please input something to search result across the database')
                }
                if (pathName.startsWith('/search')) {
                    router.setParams({ query })
                } else {
                    router.push(`/search/${query}`)
                }
            }}>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput;