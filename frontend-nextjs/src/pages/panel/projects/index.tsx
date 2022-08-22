import { Table } from '../../../components/common/Table/Table';
import { Layout } from '../../../components/Layout/Layout';
import { FiChevronsLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import config from '../../../config.json';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const column = ['نام', 'نسخه', 'زمان پویش', 'نام فایل', 'عملیات'];

function Page() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getDataUseEffect() {
        setLoading(true);
        const serverData = await axios.get(`${config.baseurl}project-list/`);
        setData(serverData.data.result);
        setLoading(false);
    }

    useEffect(() => {
        if (!router.isReady) return;
        getDataUseEffect();
    }, [router.isReady]);

    return (
        <Layout>
            <div className="min-h-screen">
                {loading ? (
                    <div className="flex justify-center items-center h-80">
                        <div className="w-9 h-9 border-t border-b border-emerald-600 animate-spin rounded-full" />
                    </div>
                ) : (
                    <Table column={column}>
                        <>
                            {data.map((match: any, index: number) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b 00 bg-gray-800 border-gray-700"
                                    >
                                        <td
                                            scope="row"
                                            className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                        >
                                            {match.appInfo?.app_name}
                                        </td>
                                        <td className="py-4 px-6 text-start">
                                            {match.appInfo?.androidversion_name}
                                        </td>
                                        <td className="py-4 px-6 text-start">
                                            {match?.createDate}
                                        </td>
                                        <td className="py-4 px-6 text-start">
                                            {match?.fileName}
                                        </td>
                                        <td className="py-4 px-6 text-start">
                                            <Link
                                                href={`/panel/projects/appinfo/${match.id}`}
                                            >
                                                <FiChevronsLeft className="rounded-full transition-all cursor-pointer duration-300 text-teal-700 hover:bg-emerald-100 w-9 h-9 p-2" />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    </Table>
                )}
            </div>
        </Layout>
    );
}

export default Page;
