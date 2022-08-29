import { useSelector } from "react-redux";
import {
    Grammar,
    Lexem,
    Production,
    LLInterface,
} from "@ronico.billy/ll/lib/interface";
import { LL } from "@ronico.billy/ll";
import Button from "./components/Button";
import { RootState } from "./store";
import { notyf, isLowerCase, isUpperCase } from "./utils";
import Result from "./components/Result";
import { useDispatch } from "react-redux";
import { appActions } from "./slices/app";
import Add from "./components/Add";
import { Route, Routes } from "react-router-dom";

const App = () => {
    const dispatch = useDispatch();
    const prods = useSelector((state: RootState) => state.app.prods);
    return (
        <div className="px-4 py-4 container mx-auto">
            <h1 className="font-black text-2xl text-center">
                Grammar LL Solver
            </h1>
            <div className="mt-8">
                <Routes>
                    <Route path="/" element={<Add />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
