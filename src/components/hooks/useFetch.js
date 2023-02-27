import { useEffect, useState } from "react"

export const useFetch = (url) =>{
    const [data, setData] = useState(null);    
    const [isPending, setIsPending] = useState(false);  
    const [errors, setErrors] = useState(null);    
    

    useEffect(() =>{
        const controller = new AbortController();

        const fetchData = async () => {
            setIsPending(true)


            try {
                const response = await fetch(url, {signal: controller.signal})

                if(!response.ok){
                    throw new Error(response.statusText)
                }
                
                const json = await response.json()                
                setData(json)
                setErrors(false)
            } catch (err) {
                setErrors('Could not fetch data');
                console.log(err);
            } finally {
                setIsPending(false)
            }
            
        }
        fetchData()

        return () => controller.abort()
    },[url])

    return {data, isPending, errors}
}