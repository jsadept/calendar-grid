import { configureStore } from '@reduxjs/toolkit'
import {Action} from "redux";
import { ThunkAction } from 'redux-thunk';
import taskSlice from "./task/task-slice";

export const store = configureStore({
    reducer: {
        task: taskSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
