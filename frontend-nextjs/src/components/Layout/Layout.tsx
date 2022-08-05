import React from "react";
import {FiBox} from "react-icons/fi"

interface IProps {
    children:React.ReactNode
}

function Layout({children}:IProps) {
    return (
        <div className="flex bg-[#16151C]">
            <div className="flex flex-col w-4/5">
                <div className="px-4 py-6">
                    <div className="h-16 bg-[#1F1E26] w-full  rounded-xl ">

                    </div>
                </div>

                <div className=" p-4 bg-[#16151C]">
                    {children}
                </div>
            </div>


            <aside className="w-1/5 right-0 fixed border-l border-gray-600" aria-label="Sidebar">
                <div className="h-20 mt-6 mb-4 mx-3 flex rounded-md items-center justify-center font-bold bg-gray-800 text-white">
                    LOGO
                </div>
                <div className="overflow-y-auto py-4 px-3 h-screen  ">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#"
                                className="flex justify-end items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700"
                            >

                                <span className="flex mr-3 items-center text-base text-emerald-600 font-bold">
                                    پروژه ها
                                </span>
                                <FiBox className="text-emerald-700" size={23}/>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex justify-end items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700"
                            >

                                <span className="flex mr-3 items-center text-base text-white">
                                    لیست اسیب ها
                                </span>
                                <FiBox className="text-white" size={23}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export { Layout };
