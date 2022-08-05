import React from 'react';

interface IProps {
    children: React.ReactNode;
    column: Array<string>;
}

function Table({ children, column }: IProps) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {column.map((item, index) => {
                        return (
                            <th key={index} scope="col" className="py-3 px-6">
                                {item}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}

export { Table };
