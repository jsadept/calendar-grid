import {RootState} from "../index";
import {ITaskState} from "./task-types";

export const selectTasksState = (state: RootState): ITaskState => state.task;
export const selectTasks = (state: RootState): { [date: string]: ITask[] } | [] => selectTasksState(state).tasks;
export const selectTagsArray = (state: RootState): ITag[] => Object.values(selectTasksState(state).tags);
export const selectSearchText = (state: RootState): string => selectTasksState(state).calendarFilter.searchText;
export const selectFilterTagIds = (state: RootState): string[] => selectTasksState(state).calendarFilter.tags;
export const selectIsShowHolidays = (state: RootState): boolean => selectTasksState(state).calendarFilter.isShowHolidays;

