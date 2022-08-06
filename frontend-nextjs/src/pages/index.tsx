import type { NextPage } from 'next'
import React, { useState } from 'react'
import axios from "axios"
import {useDropzone} from 'react-dropzone';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone();

  const acceptedFileItems = acceptedFiles.map((file:any) => (
    <li key={file.path} className="py-3 px-5 rounded-md bg-slate-300">
      {file.path} - <span className='text-orange-500'>
       ( {file.size} bytes )
      </span>
    </li>
  ));


  async function handleClick(){
    if(!acceptedFiles[0]) {
      toast("فایلی انتخاب نشده")
      return 
    }
    setLoading(true)
    const data = new FormData()
    data.append("file",acceptedFiles[0])
    
    try {
      const result = await axios.post("http://127.0.0.1:8000/upload/",data)  
      const scanResult = await axios.get("http://127.0.0.1:8000/scan?fileName=" + result.data.fileName)
      router.push("/panel/project/"+scanResult.data.result)
    } catch (error) {
      
    }

    setLoading(false)
  }


  return (
    <div className=' min-h-screen bg-[#110F1C]  flex items-center justify-center'>
      <div className='w-2/4 rounded-md'>
        <div className='cursor-pointer'>
          <div {...getRootProps({ className: 'border-2 bg-[#374151] text-white border-[#ccc] border-dashed px-20 py-24 rounded-md flex items-center flex-col' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.apk will be accepted)</em>
          </div>
        </div>

        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
        </aside>
        <div className='flex justify-end w-full mt-4'>

        <button disabled={loading} onClick={handleClick} type="button" className="text-white flex bg-blue-800 opacity-90 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
          {
            loading &&  <div className="loader">
            <div className="face">
              <div className="circle"></div>
            </div>
            <div className="face">
              <div className="circle"></div>
            </div>
          </div>
          }
          {
            loading ? " ... درحال بررسی" :"شروع بررسی"
          }
        
        </button>

        </div>

      </div>

    </div>

  )
}

export default Home
