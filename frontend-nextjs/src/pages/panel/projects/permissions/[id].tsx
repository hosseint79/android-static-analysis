import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table } from '../../../../components/common/Table/Table';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Badge } from '../../../../components/common/Badge/Badge';
import config from "../../../../config.json"
import { ProjectDetailLayout } from '../../../../components/Layout/ProjectDetailLayout/ProjectDetailLayout';



function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { id } = router.query;


    async function getDataUseEffect(page=1) {
        setLoading(true)
        const serverData = await axios.get(
            `${config.baseurl}app-info?id=${id}`
        );
        setData(serverData.data.result);
        console.log(serverData);
        setLoading(false)
    }

    useEffect(() => {
        if (!router.isReady) return;
        getDataUseEffect();
    }, [router.isReady]);


    const column = ['نام', 'آدرس فایل', 'حساسیت', 'عملیات'];
    return (
        <ProjectDetailLayout>

            <div className=''>

            </div>
        </ProjectDetailLayout>
    );
}

export default Page;
