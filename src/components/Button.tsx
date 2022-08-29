import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    classNames?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = (props: Props) => {
    return (
        <button
            className={`bg-black text-white px-3 rounded py-1 shadow ${props.classNames}`}
            onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }}
        >
            {props.children}
        </button>
    );
};

export default Button;
