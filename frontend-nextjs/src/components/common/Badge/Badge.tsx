type Type = 'warning' | 'low' | 'medium' | 'high';

interface IProps {
    title: string;
    type: Type;
}

const colors = {
    warning: 'bg-orange-400 text-white',
    low: 'bg-cyan-600 text-white',
    medium: 'bg-amber-500 text-white',
    high: 'bg-red-600 text-white',
};

function Badge({ title, type }: IProps) {
    return (
        <span
            className={`${colors[type]}  text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded`}
        >
            {title}
        </span>
    );
}

export { Badge };
