import React from "react";

interface IProps {
    children:React.ReactNode
}

function Layout({children}:IProps) {
    return (
        <div className="flex">
            <div className="flex flex-col w-full">
                <div className="h-16 bg-[#1F1E26] w-full">

                </div>
                <div className="w-4/5 p-4 bg-[#16151C]">
                    {children}
                </div>
            </div>


            <aside className="w-1/5 right-0 fixed border-l border-gray-600" aria-label="Sidebar">
                <div className="overflow-y-auto py-4 px-3 h-screen bg-[#1F1E26] ">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <span className="inline-flex justify-center items-center mr-auto px-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    Pro
                                </span>

                                <span className="flex mr-3 items-center text-base">
                                    پروژه ها
                                </span>
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export { Layout };
