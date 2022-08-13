import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import config from "../../../../config.json"
import { ProjectDetailLayout } from '../../../../components/Layout/ProjectDetailLayout/ProjectDetailLayout';
import dynamic from 'next/dynamic';



function Page() {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;


    async function getDataUseEffect() {
        const serverData = await axios.get(
            `${config.baseurl}app-info?id=${id}`
        );
        setData(serverData.data);
        console.log(serverData.data);
        setLoading(false)
    }

    useEffect(() => {
        if (!router.isReady) return;
        getDataUseEffect();
    }, [router.isReady]);

    console.log("data",data);
    console.log("loading",loading);

    
    const column = ['نام', 'آدرس فایل', 'حساسیت', 'عملیات'];
    return (
        <ProjectDetailLayout>
            {
                loading 
                ?
                <div> loading ... </div>
                :
           
                <div className='text-white bg-[#374151] p-4 rounded-lg'>
                <div className='flex'>
                    
                    <div className='w-16 h-16 bg-slate-400 rounded-full'>
                        <img src='/images/icons/android (1).png'/>
                    </div>
                    <div className='flex items-center mr-4'>
                        {
                            data?.appInfo?.app_name
                        }
                    </div>

                
                </div>
                <div className='p-4 mt-6 '>
                    <div className='my-2'>
                        <span>
                            نام فایل :
                        </span>
                        <span> {data?.appInfo?.get_filename.split("files/")[1]} </span>
                    </div>  
                    <div className='my-2'>
                        <span>
                            نام نسخه :
                        </span>
                        <span> {data?.appInfo?.androidversion_name} </span>
                    </div>
                    <div className='my-2'>
                        <span>
                            کد نسخه :
                        </span>
                        <span> {data?.appInfo?.androidversion_code} </span>
                    </div>  
                    <div className='my-2'>
                        <span>
                            تاریخ بررسی :
                        </span>
                        <span> {data?.createDate} </span>
                    </div>                    
                </div>
            </div>
            }
           
        </ProjectDetailLayout>
    );
}

export default dynamic(() => Promise.resolve(Page), {
    ssr: false
})

