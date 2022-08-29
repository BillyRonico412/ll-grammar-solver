import { ParseInfo, Production } from "@ronico.billy/ll/lib/interface";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {
    parseInfos: ParseInfo[];
};

const ParseInfoComp = (props: Props) => {
    const ll = useSelector((state: RootState) => state.app.ll);
    if (!ll) {
        return <></>;
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Stack</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.parseInfos.map((parseInfo, i) => (
                    <tr key={i}>
                        <td>{parseInfo.word.join("")}</td>
                        <td>{parseInfo.stack.join("")}</td>
                        <td>
                            {typeof parseInfo.action === "string"
                                ? `pop(${parseInfo.action})`
                                : (() => {
                                      const indexProduction =
                                          ll.grammar.productions.findIndex(
                                              (production) =>
                                                  production.noTerm ===
                                                      (
                                                          parseInfo.action as Production
                                                      ).noTerm &&
                                                  production.sequence.length ===
                                                      (
                                                          parseInfo.action as Production
                                                      ).sequence.length &&
                                                  production.sequence.every(
                                                      (seq, i) =>
                                                          seq ===
                                                          (
                                                              parseInfo.action as Production
                                                          ).sequence[i]
                                                  )
                                          );
                                      return indexProduction;
                                  })()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ParseInfoComp;
