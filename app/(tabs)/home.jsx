import { Text, View, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { icons, images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPost, getLatestPost } from '../../lib/appwrite';
import useAppwrite from '../../lib/useApprite';
import VideoCard from '../../components/VideoCard';
import { DarkContext } from "../../context/darkContext";

const Home = () => {
  /* fetching all post */
  const { isLight, setIsLight } = useContext(DarkContext)
  const { data: posts, reFetch, isLoading } = useAppwrite(getAllPost);
  const { data: latest } = useAppwrite(getLatestPost);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    /* to basically refetch the app for more videos*/
    await reFetch()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className={`${isLight ? "bg-gray-100" : "bg-primary"} h-full`}>
      <TouchableOpacity onPress={() => setIsLight(!isLight)} className={`h-[5px] w-[5px] relative mt-1 mr-2 ${isLight ? "text-primary" : "text-gray-100"}`}>
        <Image
          source={isLight ? icons.black : icons.white}
          resizeMode="contain"
          className="w-[4px] h-[4px]"
        />
      </TouchableOpacity>      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={() => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className={`${isLight ? "text-primary" : "text-gray-100"} font-pmedium text-sm`}>Welcome Back</Text>
                <Text className={`text-2xl font-psemibold ${isLight ? "text-primary" : "text-gray-100"}`}>Victor</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className={`${isLight ? "text-primary" : "text-gray-100"} text-lg font-pregular mb-3`}>Latest Videos</Text>
              <Trending posts={latest} />
            </View>
          </View>
        )
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subtitle="Be the first to upload on AIME"
          />
        )}
        refreshControl={< RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView >
  )
}

export default Home
