import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProdInterface } from "../interface";
import { Lexem, LLInterface } from "@ronico.billy/ll/lib/interface";

export interface AppStateInterface {
    prods: ProdInterface[];
    ll: LLInterface | null;
    lexems: Lexem[];
}

const initialState: AppStateInterface = {
    prods: [],
    ll: null,
    lexems: [],
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addProduction(state, action: PayloadAction<ProdInterface>) {
            state.prods = [...state.prods, action.payload];
        },
        removeProduction(state, action: PayloadAction<string>) {
            state.prods = state.prods.filter(
                (prod) => prod.id !== action.payload
            );
        },
        setLL(state, action: PayloadAction<LLInterface | null>) {
            state.ll = action.payload;
        },
        setLexems(state, action: PayloadAction<Lexem[]>) {
            state.lexems = action.payload;
        },
    },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
