import { FiMoreHorizontal } from "react-icons/fi";
import { Table } from "../../../components/common/Table/Table";
import { Layout } from "../../../components/Layout/Layout"
const column = ["آیکون","نام","نسخه","زمان پویش","عملیات"];

function Page(){
    
    return (
      <Layout>
        <div className="min-h-screen">
        <Table column={column}>
            <>
                {[1,2,3,4].map((match: any) => {
                    return (
                        <tr className="border-b 00 bg-gray-800 border-gray-700">
                            <th
                                scope="row"
                                className="py-4 px-6 text-start font-medium whitespace-nowrap text-white"
                            >
                                شاپرک
                            </th>
                            <td className="py-4 px-6 text-start">
                            {match.path} 

                            </td>
                            <td className="py-4 px-6 text-start">
                                asdf
                            </td>
                            <td className="py-4 px-6 text-start" >
                                  <FiMoreHorizontal  className='rounded-full transition-all cursor-pointer duration-300 text-teal-700 hover:bg-emerald-100 w-9 h-9 p-2'/>
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