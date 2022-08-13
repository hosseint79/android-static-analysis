import Link from "next/link";
import React from "react";
import {FiBox, FiHome} from "react-icons/fi"

interface IProps {
    children:React.ReactNode
}

const sidebarItems = [
    {
        title:"مشخصات برنامه",
        href:"/panel/projects/appinfo/"
    },
    {
        title:"آسیب های برنامه",
        href:"/panel/projects/vulnerability/"
    },
    {
        title:"مجوز ها",
        href:"/panel/projects/permissions/"
    },
    {
        title:"فعالیت ها",
        href:"/panel/projects/activities/"
    },    
    {
        title:"گیرنده ها",
        href:"/panel/projects/receivers/"
    },        
]

function ProjectDetailLayout({children}:IProps) {
    return (
        <div className="flex justify-end bg-[#16151C]">



            <aside className="w-1/5 right-0 fixed border-l bg-[#1F1E26] border-[#272727]" aria-label="Sidebar">
                <div className="h-20 mt-6 mb-4 mx-3 flex rounded-md items-center justify-center font-bold bg-[#16151C] text-white">
                    LOGO
                </div>
                <div className="overflow-y-auto py-4 px-3 h-screen  ">
                    <ul className="space-y-2">
                        {
                            sidebarItems.map((item) => {
                                return  <li>
                                <Link
                                    href={item.href}
                               
                                >
                                <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                                    <FiBox className ="text-emerald-700" size={23}/>
    
                                    <span className="flex mr-3 items-center text-base text-emerald-600 font-bold">
                                        {
                                            item.title
                                        }
                                    </span>
                                </div>
                                </Link>
                            </li>
                            })
                        }
                    </ul>
                </div>
            </aside>

            <div className="flex flex-col w-4/5">
                <div className="px-4 py-6">
                    <div className="h-16 bg-[#1F1E26] w-full px-4 flex items-center rounded-md ">
                        <Link href="/"><FiHome  color="white" className="w-10 mr-auto rounded-lg h-10 cursor-pointer p-2 hover:bg-gray-700"/></Link>
                    </div>
                </div>

                <div className="min-h-screen p-4 bg-[#16151C]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export { ProjectDetailLayout };
