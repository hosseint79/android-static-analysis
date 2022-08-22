import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import config from '../../config.json';
import axios from 'axios';
import { PaddingWrapper } from '../common/PaddingWrapper/PaddingWrapper';
import { FiHome, FiUploadCloud } from 'react-icons/fi';
import Link from 'next/link';

function UploadFileContainer() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const acceptedFileItems = acceptedFiles.map((file: any) => (
        <li key={file.path} className="py-3 px-5 rounded-md bg-slate-300">
            {file.path} -{' '}
            <span className="text-orange-500">
                <span>( {file.size} bytes )</span>
            </span>
        </li>
    ));

    async function handleClick() {
        if (!acceptedFiles[0]) {
            toast('فایلی انتخاب نشده');
            return;
        }
        setLoading(true);
        const data = new FormData();
        data.append('file', acceptedFiles[0]);

        try {
            const result = await axios.post(config.baseurl + 'upload/', data);
            const scanResult = await axios.get(
                config.baseurl + 'scan?fileName=' + result.data.fileName
            );
            router.push('/panel/projects/appinfo/' + scanResult.data.result);
        } catch (error) {
            toast.error('خطای سرور');
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#110F1C] flex flex-col items-center ">
            <div className=" flex-col w-full lg:w-11/12 ">
                <div className="px-4 py-6">
                    <div className="h-16 justify-between bg-[#1d1c23] w-full px-6 flex items-center rounded-xl ">
                        <Link href="/panel/projects">
                            <span className="font-semibold  cursor-pointer py-2 px-4 rounded-lg duration-300 hover:bg-teal-700 text-zinc-100 text-sm">
                                پنل کاربری
                            </span>
                        </Link>
                        <a href="http://localhost:8000/admin" target="_blank">
                            <span className="font-semibold cursor-pointer py-2 px-4 rounded-lg duration-300 hover:bg-teal-700 text-zinc-100 text-sm">
                                ورود
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-2/4 rounded-md mt-24">
                <PaddingWrapper>
                    <div className="cursor-pointer">
                        <div
                            {...getRootProps({
                                className:
                                    'border-2 bg-[#374151] text-white border-[#ccc] border-dashed lg:px-20 py-20 lg:py-24 rounded-md flex items-center flex-col',
                            })}
                        >
                            <input {...getInputProps()} />
                            <p className="text-center">
                                Drag n drop some files here, or click to select
                                files
                            </p>
                            <em>(Only *.apk will be accepted)</em>
                        </div>
                    </div>
                    <aside>
                        <h4>Accepted files</h4>
                        <ul>{acceptedFileItems}</ul>
                    </aside>
                    <div className="flex flex-row-reverse justify-end w-full mt-4">
                        <button
                            disabled={loading}
                            onClick={handleClick}
                            type="button"
                            className="text-white flex  bg-teal-700 opacity-90 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            {loading ? 'درحال بررسی ...' : 'شروع بررسی'}
                            {loading && (
                                <div className="loader">
                                    <div className="face">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="face">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                </PaddingWrapper>
            </div>
        </div>
    );
}

export { UploadFileContainer };
