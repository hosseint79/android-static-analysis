import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiChevronsLeft, FiMoreHorizontal } from "react-icons/fi";
import { Table } from "../../../components/common/Table/Table";
import { Layout } from "../../../components/Layout/Layout"
import config from "../../../config.json"

const column = ["نام","نسخه","زمان پویش","نام فایل","عملیات"];

function Page(){
  const router = useRouter();


  const [pageCount, setPageCount] = useState(0);
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getDataUseEffect() {
      setLoading(true)
      const serverData = await axios.get(
          `${config.baseurl}project-list/`
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

    return (
      <Layout>
        <div className="min-h-screen">
        <Table column={column}>
            <>
                {data.map((match: any) => {
                    return (
                        <tr className="border-b 00 bg-gray-800 border-gray-700">
                            <th
                                scope="row"
                                className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                            >
                                {match.appInfo?.app_name}
                            </th>
                            <td className="py-4 px-6 text-start">
                {match.appInfo?.androidversion_name}

                            </td>
                            <td className="py-4 px-6 text-start">
                              {match?.createDate}
                            </td>
                            <td className="py-4 px-6 text-start">
                              {match?.fileName}
                            </td>                            
                            <td className="py-4 px-6 text-start" >
                              <Link href={`/panel/project/${match.id}`}>
                              <FiChevronsLeft  className='rounded-full transition-all cursor-pointer duration-300 text-teal-700 hover:bg-emerald-100 w-9 h-9 p-2'/>
                              </Link>
                            </td>
                        </tr>
                    );
                })}
            </>
        </Table>
        </div>
        </Layout>
    )
}

export default Page