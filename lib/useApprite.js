import { useEffect, useState } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    

    const fectchData = async () => {
        isLoading(true)
        try {
            const response = await fn();
            setData(response)
            setIsLoading(false)
        } catch (error) {
            Alert.alert("Error", error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fectchData()
    }, [])
    const reFetch = () => fectchData()
    return { data, reFetch, isLoading }
}
export default useAppwrite;