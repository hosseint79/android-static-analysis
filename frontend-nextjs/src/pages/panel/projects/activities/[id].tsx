import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table } from '../../../../components/common/Table/Table';
import config from "../../../../config.json"
import { ProjectDetailLayout } from '../../../../components/Layout/ProjectDetailLayout/ProjectDetailLayout';



function Page() {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;


    async function getDataUseEffect(page=1) {
        setLoading(true)
        const serverData = await axios.get(
            `${config.baseurl}app-info?id=${id}`
        );
        setData(serverData.data.appInfo.activities);
        console.log(serverData.data.appInfo);
        setLoading(false)
    }

    useEffect(() => {
        if (!router.isReady) return;
        getDataUseEffect();
    }, [router.isReady]);


    const column = ['نام فعالیت'];
    return (
        <ProjectDetailLayout>
            {
                loading 
                ?
                <div> loading ... </div>
                :
                <Table column={column}>
                <>
                    {data.map((match: any) => {
                        return (
                            <tr className="border-b 00 bg-gray-800 border-gray-700">
                                <td
                                    scope="row"
                                    className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                >
                                    {match}
                                </td>
                            </tr>
                        );
                    })}
                </>
            </Table>
            }
           
        </ProjectDetailLayout>
    );
}

export default Page;
