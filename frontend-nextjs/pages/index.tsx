import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from "axios"

const Home: NextPage = () => {
  const [file,setFile] = useState<any>()
  const [loading,setLoading] = useState(false)

  const onchangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files)
  }

  async function handleClick(){
    setLoading(true)
    const data = new FormData()
    data.append("file",file[0])
    
    try {
      const result = await axios.post("http://127.0.0.1:8000/upload/",data)  
      const scanResult = await axios.get("http://127.0.0.1:8000/scan?fileName=" + result.data.fileName)
      console.log(scanResult)
    } catch (error) {
      
    }

    setLoading(false)
  }

  return (
   <div>
      <input type="file" onChange={onchangeHandle}/>
      <button onClick={handleClick}> click </button>
      {
        loading && <div> loading ....
          </div>
      }
   </div>
  )
}

export default Home
