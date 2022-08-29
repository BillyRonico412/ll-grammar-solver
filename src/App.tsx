import { useSelector } from "react-redux";
import { RootState } from "./store";
import Result from "./components/Result";
import { useDispatch } from "react-redux";
import Add from "./components/Add";
import { Route, Routes } from "react-router-dom";
import { FaGithub, FaUserAlt } from "react-icons/fa";

const App = () => {
    const dispatch = useDispatch();
    const prods = useSelector((state: RootState) => state.app.prods);
    return (
        <div className="px-4 py-4 container mx-auto min-h-screen flex flex-col">
            <h1 className="font-black text-2xl text-center">
                Grammar LL Solver
            </h1>
            <div className="mt-8">
                <Routes>
                    <Route path="/" element={<Add />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </div>
            <div className="pt-16 pb-4 mt-auto text-gray-600 text-center">
                <p>Created by @RonicoBilly</p>
                <div className="flex justify-center mt-3 gap-x-8">
                    <a
                        href="https://github.com/BillyRonico412/ll-grammar-solver"
                        target={"_blank"}
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://billyronico412.github.io/"
                        target={"_blank"}
                    >
                        <FaUserAlt />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;
