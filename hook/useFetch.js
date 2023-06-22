import { useState, useEffect } from "react";
import axios from "axios"

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const api_key1 = `81cae865f1mshf15ba6ad1038215p15bb9bjsna7272f4745c1`
    
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': `${api_key1}`,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
            ...query
        },

    };



    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options)
            console.log(response.data)
            setData(response.data.data)
            // console.log(response.data)

        } catch (error) {
            setError(error)
            alert('There is an error')
            console.log(error)
        } finally {
            setIsLoading(false)

        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    };

    return { data, isLoading, error, refetch }

}

export default useFetch