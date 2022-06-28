import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";


export const diarySlice = createSlice({
    name: 'diary',
    initialState : {
        value: [],
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        init: (state, action) => {
            state.value = [...action.payload];
            localStorage.setItem('diary', JSON.stringify(state))
        },
        create: (state, action) => {
            state = [action.data, ...state];
            localStorage.setItem('diary', JSON.stringify(state))
        },
        remove: (state, action) => {
            state = state.filter((it)=>it.id !== action.targetId);
            localStorage.setItem('diary', JSON.stringify(state))
        },
        edit: (state, action) => {
            state = state.map((it) =>
                it.id === action.data.id ? {...action.data} : it
            );
            localStorage.setItem('diary', JSON.stringify(state))
        },
    },
})



export const { create, remove, edit, init } = diarySlice.actions;
export default diarySlice.reducer;
