import { useRef, useState } from "react";

{/* <h2 id="accordion-collapse-heading-1">
<button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
  <span>What is Flowbite?</span>
  <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
</h2>
<div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
<div class="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
  <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
  <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
</div>
</div> */}

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
                    <svg
                        className={`w-6 h-6 shrink-0 ${
                            open ? 'rotate-180' : 'rotate-0'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span>
                        {title}
                    </span>
                </button>
            </h2>
            <div
                style={open ? { height: height } : { height: 0 }}
                className="overflow-hidden duration-300"
            >
                <div
                    ref={ref}
                    className="overflow-hidden duration-300 h-auto py-5 px-3 font-light border-b border-gray-700"
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export { AccardionItem }