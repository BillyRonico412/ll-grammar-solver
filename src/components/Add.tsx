import { LL } from "@ronico.billy/ll";
import {
    Production,
    Grammar,
    Lexem,
    LLInterface,
} from "@ronico.billy/ll/lib/interface";
import { notyf } from "../utils";
import { useSelector } from "react-redux";
import { appActions } from "../slices/app";
import { RootState } from "../store";
import { isLowerCase, isUpperCase } from "../utils";
import Button from "./Button";
import InputAddProduction from "./InputAddProduction";
import Prod from "./Prod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const prods = useSelector((state: RootState) => state.app.prods);
    const ll = useSelector((state: RootState) => state.app.ll);
    const onClickValider = () => {
        if (prods.length < 2) {
            notyf.error("Two production minimum");
            return;
        }
        const terms: string[] = prods
            .map((prod) => prod.right)
            .join("")
            .split("")
            .filter((s) => isLowerCase(s))
            .filter((s, i, a) => !a.slice(0, i).includes(s));

        const noTerms: string[] = prods
            .map((prod) => prod.left)
            .join("")
            .split("")
            .filter((s, i, a) => !a.slice(0, i).includes(s));

        const rightNoTerms: string[] = prods
            .map((prod) => prod.right)
            .join("")
            .split("")
            .filter((s) => isUpperCase(s))
            .filter((s, i, a) => !a.slice(0, i).includes(s));

        const noTermNotHaveProduction: string[] = [];

        rightNoTerms.forEach((rightNoTerm) => {
            if (!noTerms.includes(rightNoTerm)) {
                noTermNotHaveProduction.push(rightNoTerm);
            }
        });

        if (noTermNotHaveProduction.length > 0) {
            notyf.error(
                `[${noTermNotHaveProduction.join(
                    "-"
                )}] don't have any production`
            );
            return;
        }

        const firstSymbol: string = prods[0].left;

        const productions: Production[] = prods.map((prod) => ({
            noTerm: prod.left,
            sequence:
                prod.right.split("").length === 0 ? [""] : prod.right.split(""),
        }));

        const grammar: Grammar = {
            terms,
            noTerms,
            firstSymbol,
            productions,
        };

        const lexems: Lexem[] = terms.map((term) => ({
            name: term,
            value: `^${term}$`,
        }));

        console.log(grammar);

        let ll: LLInterface | false = false;
        for (let i = 1; i < 10; i++) {
            console.log(ll);
            if ((ll = LL(i, grammar, "@"))) {
                break;
            }
        }
        if (!ll) {
            notyf.error("Grammar not LL(k) k € {1, ..., 9}");
            return;
        }

        notyf.success(`Grammar LL(${ll.k})`);
        console.log(ll);
        dispatch(appActions.setLL(ll));
        dispatch(appActions.setLexems(lexems));
        navigate("/result");
    };

    useEffect(() => {
        dispatch(appActions.setLL(null));
    }, []);

    return (
        <>
            {!ll && (
                <>
                    <div className="flex flex-col items-center text-gray-500">
                        <p>Terminal symbol: LowerCase letter</p>
                        <p>No-terminal symbol: UpperCase letter</p>
                        <p>First symbol: First production</p>
                    </div>

                    <ul className="mt-8 flex flex-col gap-y-2">
                        {prods.map((prod, i) => (
                            <li key={i}>
                                <Prod prod={prod} />
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8">
                        <div>
                            <InputAddProduction />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button
                            classNames="!px-6 !py-2 font-black"
                            onClick={onClickValider}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default Add;
