import React, { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";

interface IProps {
    children?:React.ReactNode;
    open:boolean;
    setModal:Dispatch<SetStateAction<boolean>>
}

function Modal({children,open,setModal}:IProps) {

    function closeModal(){
        setModal(false)
    }   

    function preventClose(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
        e.stopPropagation()
    }

    return (
        <>
        <div
            onClick={closeModal}
            className={`flex bg-[#0f0f0fc8] justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full 
                        ${open ? "opacity-100 visible" : "invisible opacity-0"}`
                      }
        >
            <div
                onClick={preventClose}
                className={`relative  transition-all duration-500 p-4 w-full max-w-2xl h-full md:h-auto ${open ? "top-0" : "top-12"}`}
            >
                <div className="relative rounded-lg shadow z-60 bg-gray-200 ">
                    <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
                        
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                            onClick={closeModal}
                        >
                            <FiX size={23}/>
                        </button>
                    </div>
                    {
                        children
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export { Modal };
