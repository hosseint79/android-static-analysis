import axios from 'axios';
import { useRouter } from 'next/router';
import config from '../../../config.json';
import { useEffect, useState } from 'react';
import { Layout } from '../../../components/Layout/Layout';
import { Badge } from '../../../components/common/Badge/Badge';
import { Table } from '../../../components/common/Table/Table';

const column = ['عنوان', 'حساسیت', 'توضیحات', 'عملیات'];

function Page() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getDataUseEffect() {
        setLoading(true);
        const serverData = await axios.get(`${config.baseurl}rules-list/`);
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
                            {data.map((match: any) => {
                                return (
                                    <tr
                                        key={match?.id}
                                        className="border-b bg-gray-800 border-gray-700"
                                    >
                                        <td
                                            scope="row"
                                            className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                        >
                                            {match?.persianTitle}
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                        >
                                            <Badge
                                                title={match?.severity}
                                                type={match?.severity}
                                            />
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                        >
                                            {match.description.replace(
                                                /(.{60})..+/,
                                                '$1…'
                                            )}
                                        </td>
                                        <td
                                            scope="row"
                                            className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                                        >
                                            ...
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
