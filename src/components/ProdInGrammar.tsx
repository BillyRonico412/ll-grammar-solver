import { Production } from "@ronico.billy/ll/lib/interface";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";

type Props = {
    production: Production;
    index: number
};

const ProdInGrammar = (props: Props) => {
    return (
        <li className="flex tracking-widest items-center gap-x-4">
            <span>{props.production.noTerm}</span>
            <FaArrowRight className="text-sm" />
            <span>{props.production.sequence.join("")}</span>
            <span>({props.index})</span>
        </li>
    );
};

export default ProdInGrammar;
