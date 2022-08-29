import { AnalysisTable } from "@ronico.billy/ll/lib/interface";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {
    analysisTables: AnalysisTable[];
};

const AnalysisTableComp = (props: Props) => {
    const ll = useSelector((state: RootState) => state.app.ll);
    const noTerms = useMemo<string[]>(
        () =>
            props.analysisTables
                .map((analysisTable) => analysisTable.noTerm)
                .filter((it, i, a) => !a.slice(0, i).includes(it)),
        [props.analysisTables]
    );
    const terms = useMemo<string[]>(
        () =>
            props.analysisTables
                .map((analysisTable) => analysisTable.terms.join(""))
                .filter((it, i, a) => !a.slice(0, i).includes(it)),
        [props.analysisTables]
    );
    if (!ll) {
        return <></>;
    }
    return (
        <table className="table-analysis">
            <thead>
                <tr>
                    <th></th>
                    {terms.map((term, i) => (
                        <th key={i}>{term}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {noTerms.map((noTerm, i) => (
                    <tr key={i}>
                        <td className="text-lg font-bold">{noTerm}</td>
                        {terms.map((term, j) => {
                            const analysisTable = props.analysisTables.find(
                                (analysisTable) =>
                                    analysisTable.noTerm === noTerm &&
                                    analysisTable.terms.join("") === term
                            );
                            if (!analysisTable) {
                                return <td key={j}>ø</td>;
                            }
                            const indexProduction =
                                ll.grammar.productions.findIndex(
                                    (production) =>
                                        production.noTerm ===
                                            analysisTable.production.noTerm &&
                                        production.sequence.length ===
                                            analysisTable.production.sequence
                                                .length &&
                                        production.sequence.every(
                                            (seq, i) =>
                                                seq ===
                                                analysisTable.production
                                                    .sequence[i]
                                        )
                                );

                            if (indexProduction < 0) {
                                return <td key={j}>ø</td>;
                            }
                            return <td key={j}>{indexProduction}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AnalysisTableComp;
