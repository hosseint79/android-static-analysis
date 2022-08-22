import React from 'react';

interface IProps {
    children: React.ReactNode;
    column: Array<string>;
}

function Table({ children, column }: IProps) {
    return (
        <div className="overflow-x-auto rounded-md">
            <table
                className="w-full text-sm  text-left text-gray-400"
                style={{ direction: 'rtl' }}
            >
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        {column.map((item, index) => {
                            return (
                                <th
                                    key={index}
                                    scope="col"
                                    className="py-3 px-6 text-start"
                                >
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}

export { Table };
