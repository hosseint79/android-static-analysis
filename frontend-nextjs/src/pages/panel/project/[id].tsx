import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function Page(){
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        async function getDataUseEffect(){  
            const serverData =  await axios.get("http://127.0.0.1:8000/scan-detail?id=25")
            setData(serverData.data.result)
            console.log(serverData)
        } 
        getDataUseEffect()
    },[])

    return (
        <div> 
            {
                data.map((item) => {
                    return <div>
                        sdfasdf
                    </div>
                })
            }
        </div>
    )
}

export default Page 