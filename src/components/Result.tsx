import { parser, scanner } from "@ronico.billy/ll";
import { ParseInfo } from "@ronico.billy/ll/lib/interface";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { notyf } from "../utils";
import AnalysisTableComp from "./AnalisysTableComp";
import Button from "./Button";
import ParseInfoComp from "./ParseInfoComp";
import ProdInGrammar from "./ProdInGrammar";

const Result = () => {
    const navigate = useNavigate();
    const ll = useSelector((state: RootState) => state.app.ll);
    const lexems = useSelector((state: RootState) => state.app.lexems);
    const [text, setText] = useState("");
    const [parseInfos, setParseInfos] = useState<ParseInfo[] | null>(null);
    const myParser = ll ? parser(ll) : null;
    const onClickCheck = () => {
        const tokens = scanner(lexems, text);
        if (!Array.isArray(tokens)) {
            notyf.error(`Unknown character: ${tokens.unknownChar}`);
            return;
        }
        if (myParser) {
            const parseRes = myParser(tokens);
            if (typeof parseRes.res !== "boolean") {
                notyf.error("Parsing Error");
                return;
            }
            notyf.success("Parsing successfuly");
            setParseInfos(parseRes.parseInfos);
        }
    };
    useEffect(() => {
        if (!ll) {
            navigate("/");
        }
    }, []);
    if (!ll || !myParser) {
        return <></>;
    }
    return (
        <>
            <div className="flex flex-col items-center">
                <h2 className="font-bold text-lg">Grammar LL({ll.k})</h2>
                <ul className="flex flex-col mt-4">
                    {ll.grammar.productions.map((production, i) => (
                        <ProdInGrammar
                            key={i}
                            production={production}
                            index={i}
                        />
                    ))}
                </ul>
                <h2 className="font-bold text-lg mt-8">Lookaheads</h2>
                <ul className="tracking-wider mt-4">
                    {ll.lookaheads.map((lookahead, i) => (
                        <li key={i}>{`${ll.k}-lookahead(${
                            lookahead.production.noTerm
                        } -> ${lookahead.production.sequence.join(
                            ""
                        )}) = {${lookahead.value.map((arrayString) =>
                            arrayString.join("")
                        )}}`}</li>
                    ))}
                </ul>
                <h2 className="font-bold text-lg mt-8">AnalysisTable</h2>
                <div className="overflow-auto mt-4">
                    <AnalysisTableComp analysisTables={ll.analysisTables} />
                </div>
                <h2 className="font-bold text-lg mt-8">Parse Word</h2>
                <div className="flex gap-x-4 mt-4">
                    <input
                        type="text"
                        className="w-48 text-center bg-gray-200 rounded px-4 py-1 shadow"
                        placeholder="abc"
                        value={text}
                        onInput={(e) => {
                            setParseInfos(null);
                            setText(e.currentTarget.value);
                        }}
                    />
                    <Button onClick={onClickCheck}>
                        <FaCheck />
                    </Button>
                </div>
                {parseInfos && (
                    <div className="mt-8 overflow-x-auto">
                        <ParseInfoComp parseInfos={parseInfos} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Result;
