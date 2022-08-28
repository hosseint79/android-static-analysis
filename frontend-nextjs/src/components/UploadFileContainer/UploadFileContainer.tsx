import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import config from '../../config.json';
import axios from 'axios';

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
        <div className=" min-h-screen bg-[#110F1C]  flex items-center justify-center">
            <div className="w-full px-4 md:w-2/4 lg:px-0 rounded-md">
                <div className="cursor-pointer">
                    <div
                        {...getRootProps({
                            className:
                                'border-2 bg-[#374151] text-white border-[#ccc] border-dashed  lg:px-20 py-24 rounded-md flex items-center flex-col',
                        })}
                    >
                        <input {...getInputProps()} />
                        <p className="text-center">
                            Drag n drop some files here, or click to select
                            files
                        </p>
                        <em className="text-center mt-2">
                            (Only *.apk will be accepted)
                        </em>
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
            </div>
        </div>
    );
}

export { UploadFileContainer };
