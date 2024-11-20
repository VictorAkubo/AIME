import { Text, View, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { icons, images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { searchPost } from '../../lib/appwrite';
import useAppwrite from '../../lib/useApprite';
import VideoCard from '../../components/VideoCard';
import { DarkContext } from "../../context/darkContext";
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  /* fetching searched post */
  const query = useLocalSearchParams();
  const { isLight, setIsLight } = useContext(DarkContext)
  const { data: posts, reFetch } = useAppwrite(() => searchPost(query));

  useEffect(() => {
    reFetch
  }, [query])
  return (
    <SafeAreaView className={`${isLight ? "bg-gray-100" : "bg-primary"} h-full`}>
      <TouchableOpacity onPress={() => setIsLight(!isLight)} className={`${isLight ? "text-primary" : "text-gray-100"}`}>
        <Image
          source={isLight ? icons.black : icons.white}
          resizeMode="contain"
          className="w-4 h-4"
        />
      </TouchableOpacity>      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={() => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className={`${isLight ? "text-primary" : "text-gray-100"} font-pmedium text-sm`}>Search Results</Text>
            <Text className={`text-2xl font-psemibold ${isLight ? "text-primary" : "text-gray-100"}`}>{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )
        }
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Video Found `}
            subtitle={`No videos found for ${query} `}
          />
        )}

      />
    </SafeAreaView >
  )
}

export default Search
