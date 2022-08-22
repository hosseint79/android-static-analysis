import axios from 'axios';
import { useRouter } from 'next/router';
import config from '../../../config.json';
import { useEffect, useState } from 'react';
import { Layout } from '../../../components/Layout/Layout';
import { Badge } from '../../../components/common/Badge/Badge';
import { Table } from '../../../components/common/Table/Table';
import { Modal } from '../../../components/common/Modal/Modal';
import { FiMoreHorizontal } from 'react-icons/fi';

const column = ['عنوان', 'حساسیت', 'توضیحات', 'عملیات'];

function ModalContent({ modalData }: { modalData: any }) {
    return (
        <div className="p-7">
            <span> توضیحات : </span>
            <br />
            <p className="mt-4">{modalData?.description}</p>
        </div>
    );
}

function Page() {
    const router = useRouter();

    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState();

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
                <Modal open={modal} setModal={setModal}>
                    <ModalContent modalData={modalData} />
                </Modal>
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
                                            {match?.persianTitle.replace(
                                                /(.{60})..+/,
                                                '$1…'
                                            )}
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
                                            className="py-4 px-6 text-start"
                                            onClick={() => {
                                                setModalData(match);
                                                setModal(true);
                                            }}
                                        >
                                            <FiMoreHorizontal className="rounded-full transition-all cursor-pointer duration-300 text-teal-700 hover:bg-emerald-100 w-9 h-9 p-2" />
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
