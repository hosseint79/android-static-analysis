import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { groupBy } from 'lodash';
import { AccardionItem } from '../../../components/Accardion/Accardion';
import { Table } from '../../../components/common/Table/Table';
import { Layout } from '../../../components/Layout/Layout';
import ReactPaginate from 'react-paginate';
import { Modal } from '../../../components/common/Modal/Modal';


function Page() {
    const [modal, setModal] = useState(false);

    // We start with an empty list of items.
    const [pageCount, setPageCount] = useState(0);



    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { id } = router.query;


    async function getDataUseEffect(page=1) {
        setLoading(true)
        const serverData = await axios.get(
            `http://127.0.0.1:8000/scan-detail?page=${page}&step=${200}&id=${id}`
        );
        setData(serverData.data.result);
        setPageCount(serverData.data.pageCount)
        console.log(serverData);
        setLoading(false)
    }

    useEffect(() => {
        if (!router.isReady) return;
        getDataUseEffect();
    }, [router.isReady]);

    function handlePageChange(page:{selected:number}){
        getDataUseEffect(page.selected + 1)
    }

    let final = groupBy(data, 'name');
    const column = ['نام', 'آدرس فایل', 'حساسیت', 'عملیات'];
    return (
        <Layout>
            <button onClick={() => {
                setModal(true)
            }} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="true">
            Toggle modal
            </button>
            <Modal open={modal} setModal={setModal}>
                <span>
                    test children
                </span>
            </Modal>

            <div className="bg-[#16151C] min-h-screen">
                {
                    loading ?
                    <span> loading</span>
                    :
                    <>
                    {Object.keys(final).map((name: any) => {
                        return (
                            <>
                                <AccardionItem key={name} title={name}>
                                    <Table column={column}>
                                        <>
                                            {final[name].map((match: any) => {
                                                return (
                                                    <tr className="border-b 00 bg-gray-800 border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="py-4 px-6 font-medium whitespace-nowrap text-white"
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
                    </>
                }

                

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    className="flex text-white items-center justify-center my-5"
                    pageLinkClassName="w-8 h-8 flex justify-center items-center rounded-full "
                    pageClassName="text-sm mx-1 bg-gray-700 rounded-full"
                    activeLinkClassName="bg-emerald-600 opacity-70"
                    nextLinkClassName=" bg-emerald-700 rounded-full w-8 h-8 flex justify-center items-center block text-sm mx-1 bg-gray-400"

                    previousLinkClassName="bg-emerald-700 rounded-full w-8 h-8 flex justify-center items-center block text-sm mx-1 bg-gray-400"
                />
            </div>


        </Layout>
    );
}

export default Page;
