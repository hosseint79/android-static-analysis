import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { groupBy } from 'lodash';
import { AccardionItem } from '../../../components/Accardion/Accardion';
import { Table } from '../../../components/common/Table/Table';
import { Layout } from '../../../components/Layout/Layout';

function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;
        async function getDataUseEffect() {
            const serverData = await axios.get(
                `http://127.0.0.1:8000/scan-detail?page=1&id=${id}`
            );
            setData(serverData.data.result);
            console.log(serverData);
        }
        getDataUseEffect();
    }, [router.isReady]);

    let final = groupBy(data, 'name');
    const column = ['نام', 'آدرس فایل', 'حساسیت', 'عملیات'];
    return (
        <Layout>
            <div className="bg-[#16151C] min-h-screen">
                {Object.keys(final).map((name: any) => {
                    return (
                        <>
                            <AccardionItem key={name} title={name}>
                                <Table column={column}>
                                    <>
                                        {final[name].map((match: any) => {
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {match.name}
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {match.severity}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {match.path}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        details
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </>
                                </Table>
                            </AccardionItem>
                        </>
                    );
                })}
            </div>
        </Layout>
    );
}

export default Page;
