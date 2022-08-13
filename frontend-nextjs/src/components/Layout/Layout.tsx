import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {FiBox, FiHome, FiUploadCloud} from "react-icons/fi"

interface IProps {
    children:React.ReactNode
}

function Layout({children}:IProps) {
    const router = useRouter()

    return (
        <div className="flex justify-end bg-[#16151C]">



            <aside className="w-1/5 right-0 fixed border-l bg-[#1F1E26] border-[#272727]" aria-label="Sidebar">
                <div className="h-20 mt-6 mb-4 mx-3 flex rounded-md items-center justify-center font-bold bg-[#16151C] text-white">
                    LOGO
                </div>
                <div className="overflow-y-auto py-4 px-3 h-screen  ">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/panel/projects"
                           
                            >
                            <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                                <FiBox className ={`${router.pathname.indexOf("/panel/projects") >= 0 ? "text-emerald-700": "text-white"} `} size={23}/>

                                <span className={`flex mr-3 items-center text-base font-bold
                                 ${router.pathname.indexOf("/panel/projects") >= 0 ? "text-emerald-600": "text-white"}
                                `}>
                                    پروژه ها
                                </span>
                            </div>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/panel/rules"
                           
                            >
                            <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                                <FiBox className ={`${router.pathname.indexOf("/panel/rules") >= 0 ? "text-emerald-700": "text-white"} `} size={23}/>

                                <span className={`flex mr-3 items-center text-base font-bold
                                 ${router.pathname.indexOf("/panel/rules") >= 0 ? "text-emerald-600": "text-white"}
                                `}>
                                   آسیب پذیری ها
                                </span>
                            </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="flex flex-col w-4/5">
                <div className="px-4 py-6">
                    <div className="h-16 bg-[#1F1E26] w-full px-4 flex items-center rounded-md ">
                    <Link href="/panel/projects"><FiHome  color="white" className="w-10 rounded-lg h-10 cursor-pointer p-2 hover:bg-gray-700"/></Link>
                        
                        <Link href="/"><FiUploadCloud  color="white" className="w-10 mr-auto rounded-lg h-10 cursor-pointer p-2 hover:bg-gray-700"/></Link>
                    
                    </div>
                </div>

                <div className=" p-4 bg-[#16151C]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export { Layout };
