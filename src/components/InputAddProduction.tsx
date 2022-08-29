import { useRef, useState } from "react";
import { FaArrowRight, FaPlusCircle } from "react-icons/fa";
import Button from "./Button";
import { isLetter, isUpperCase, notyf } from "../utils";
import { useDispatch } from "react-redux";
import "notyf/notyf.min.css";
import { appActions } from "../slices/app";
import { v4 } from "uuid";

const InputAddProduction = () => {
    const dispatch = useDispatch();
    const [leftSymbol, setLeftSymbol] = useState("");
    const [rightSymbol, setRightSymbol] = useState("");
    const refLeft = useRef<HTMLInputElement | null>(null);
    const onClickAdd = () => {
        if (leftSymbol.length < 1) {
            notyf.error("Empty Left Symbol");
            return;
        }
        if (leftSymbol.length > 1) {
            notyf.error("Invalid Left Symbol");
            return;
        }
        if (!isUpperCase(leftSymbol)) {
            notyf.error("Left symbol is not a no-terminal (UpperCase letter)");
            return;
        }
        if (!rightSymbol.split("").every((s) => isLetter(s))) {
            notyf.error("Right symbol contains only letter");
            return;
        }
        dispatch(
            appActions.addProduction({
                left: leftSymbol,
                right: rightSymbol,
                id: v4(),
            })
        );
        setLeftSymbol("");
        setRightSymbol("");
        if (refLeft.current) {
            refLeft.current.focus();
        }
    };
    return (
        <>
            <div className="flex items-center justify-center w-full gap-x-4">
                <input
                    ref={refLeft}
                    type="text"
                    className="w-16 px-4 py-1 rounded text-center font-bold bg-gray-200 shadow"
                    placeholder="A"
                    value={leftSymbol}
                    onInput={(e) => {
                        if (e.currentTarget.value.length <= 1) {
                            setLeftSymbol(e.currentTarget.value);
                        }
                    }}
                />
                <FaArrowRight className="text-lg" />
                <input
                    type="text"
                    className="w-28 px-4 py-1 rounded text-center font-bold bg-gray-200 shadow"
                    placeholder="abAc"
                    value={rightSymbol}
                    onInput={(e) => {
                        if (e.currentTarget.value.length <= 10) {
                            setRightSymbol(e.currentTarget.value);
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            onClickAdd();
                        }
                    }}
                />
                <Button classNames="font-bold !py-2" onClick={onClickAdd}>
                    <FaPlusCircle />
                </Button>
            </div>
        </>
    );
};

export default InputAddProduction;
