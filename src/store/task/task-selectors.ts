import {RootState} from "../index";
import {ITaskState} from "./task-types";


export const selectTasksState = (state: RootState): ITaskState => state.task;
export const selectTasks = (state: RootState): { [date: string]: ITask[] } => selectTasksState(state).tasks;
export const selectFilteredTasks = (state: RootState): { [date: string]: ITask[] } => selectTasksState(state).filteredTasks;
