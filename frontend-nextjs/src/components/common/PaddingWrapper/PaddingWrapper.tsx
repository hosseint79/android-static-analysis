import { ReactNode } from 'react';

interface IProps {
    children?: ReactNode;
}

function PaddingWrapper({ children }: IProps) {
    return <div className="px-4 lg:px-0">{children} </div>;
}

export { PaddingWrapper };
