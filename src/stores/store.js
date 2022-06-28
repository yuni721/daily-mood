import { configureStore } from "@reduxjs/toolkit"
import { diarySlice } from "../slices/diarySlice";


export const store = configureStore({
    reducer : diarySlice,
});


