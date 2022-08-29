import { ProdInterface } from "../interface";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { appActions } from "../slices/app";

type Props = {
    prod: ProdInterface;
};

const Prod = (props: Props) => {
    const dispatch = useDispatch();
    const onClickTrash = () => {
        dispatch(appActions.removeProduction(props.prod.id));
    };
    return (
        <div className="flex w-full items-center gap-x-4 tracking-widest text-lg justify-center">
            <span className="w-16 text-center">{props.prod.left}</span>
            <FaArrowRight />
            <span className="w-28">{props.prod.right}</span>
            <Button classNames="font-bold" onClick={onClickTrash}>
                <FaTrashAlt className="text-sm" />
            </Button>
        </div>
    );
};

export default Prod;
