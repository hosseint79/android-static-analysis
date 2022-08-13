import { useRef, useState } from "react";

const AccardionItem = ({ title, children }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    return (
        <>
            <h2
                onClick={() => {
                    setOpen(!open);
                    if (ref.current && ref.current.scrollHeight) {
                        setHeight(ref.current.scrollHeight);
                    }
                }}
            >
                <button
                    type="button"
                    className=" px-5 rounded-lg flex items-center justify-between w-full py-5 font-medium text-left text border mb-3 bg-[#374151] hover:bg-gray-800 border-gray-700 text-gray-400"
                >

                    <span>
                        {title}
                    </span>
                    <svg
                        className={`w-6 h-6 shrink-0 ${
                            open ? 'rotate-180' : 'rotate-0'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        ></path>
                    </svg>
                </button>
            </h2>
            <div
                style={open ? { height: height } : { height: 0 }}
                className="overflow-hidden duration-300"
            >
                <div
                    ref={ref}
                    className="overflow-hidden duration-300 h-auto py-5 font-light border-b border-gray-700"
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export { AccardionItem }