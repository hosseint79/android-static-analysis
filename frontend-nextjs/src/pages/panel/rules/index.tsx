import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiChevronsLeft, FiMoreHorizontal } from "react-icons/fi";
import { Badge } from "../../../components/common/Badge/Badge";
import { Table } from "../../../components/common/Table/Table";
import { Layout } from "../../../components/Layout/Layout"
import config from "../../../config.json"

const column = ["عنوان","حساسیت","توضیحات","عملیات"];

function Page(){
  const router = useRouter();


  const [pageCount, setPageCount] = useState(0);
    
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  async function getDataUseEffect() {
      setLoading(true)
      const serverData = await axios.get(
          `${config.baseurl}rules-list/`
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
                        <tr key={match.id} className="border-b 00 bg-gray-800 border-gray-700">
                            <td
                                scope="row"
                                className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                            >
                                {match.persianTitle}
                            </td>
                            <td
                                scope="row"
                                className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                            >
                           <Badge title={match.severity} type={match.severity}/>
                            </td>
                            <td
                                scope="row"
                                className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                            >
                                  {match.description.replace(/(.{60})..+/, "$1…")}
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
        </div>
        </Layout>
    )
}

export default Page