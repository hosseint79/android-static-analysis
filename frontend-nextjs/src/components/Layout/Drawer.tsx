import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiBox } from 'react-icons/fi';

interface IProps {
    open?: boolean;
    setOpen?: any;
}

function Drawer({ open, setOpen }: IProps) {
    const router = useRouter();
    function preventClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
    }
    return (
        <div
            className={`fixed top-0 left-0 bg-[#3d3d3d99] w-screen h-screen overflow-hidden duration-75 delay-100 ${
                open ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
            onClick={() => {
                setOpen(false);
            }}
        >
            <div
                onClick={preventClose}
                id="drawer-example"
                className={`fixed top-0 ${
                    open ? 'right-0' : '-right-96'
                } z-40 h-screen p-4 overflow-y-auto bg-white w-80 duration-300 `}
                aria-labelledby="drawer-label"
            >
                <div className="mt-2 mb-5 mx-1 bg-slate-200 rounded-lg h-20"></div>

                <ul className="space-y-2">
                    <li>
                        <Link href="/panel/projects">
                            <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                                <FiBox
                                    className={`${
                                        router.pathname.indexOf(
                                            '/panel/projects'
                                        ) >= 0
                                            ? 'text-emerald-700'
                                            : 'text-black'
                                    } `}
                                    size={23}
                                />

                                <span
                                    className={`flex mr-3 items-center text-base font-bold
                                 ${
                                     router.pathname.indexOf(
                                         '/panel/projects'
                                     ) >= 0
                                         ? 'text-emerald-600'
                                         : 'text-black'
                                 }
                                `}
                                >
                                    پروژه ها
                                </span>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link href="/panel/rules">
                            <div className="flex cursor-pointer items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                                <FiBox
                                    className={`${
                                        router.pathname.indexOf(
                                            '/panel/rules'
                                        ) >= 0
                                            ? 'text-emerald-700'
                                            : 'text-black'
                                    } `}
                                    size={23}
                                />

                                <span
                                    className={`flex mr-3 items-center text-base font-bold
                                 ${
                                     router.pathname.indexOf('/panel/rules') >=
                                     0
                                         ? 'text-emerald-600'
                                         : 'text-black'
                                 }
                                `}
                                >
                                    آسیب پذیری ها
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export { Drawer };
