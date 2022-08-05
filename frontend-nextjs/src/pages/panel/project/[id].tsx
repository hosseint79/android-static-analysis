import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { groupBy } from 'lodash';
import { AccardionItem } from '../../../components/Accardion/Accardion';


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

    return (
        <div>
            {Object.keys(final).map((name: any) => {
                return (
                    <>
                        <AccardionItem key={name} item={name}>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="py-3 px-6">
                                            نام
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                        آدرس فایل
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                           حساسیت
                                        </th>
                                        <th scope="col" className="py-3 px-6">
                                            عملیات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {final[name].map((match:any) => {
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
                                </tbody>
                            </table>
                        </AccardionItem>
                    </>
                );
            })}
        </div>
    );
}

export default Page;
