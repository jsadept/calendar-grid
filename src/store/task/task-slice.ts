import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ITaskState} from "./task-types";
import { ulid } from 'ulid';
import {DEMO_TAGS_DATA, DEMO_TASKS_DATA} from "./task-demo";

const initialState: ITaskState = {
    tasks: DEMO_TASKS_DATA,
    tags: DEMO_TAGS_DATA,
    filteredTasks: {},
    calendarFilter: {
        searchText: '',
        tags: [],
    }
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        //TASKS
        addTask: (state, action: PayloadAction<ITask>) => {
            const { date, ...taskData } = action.payload;
            state.tasks[date] = state.tasks[date] || [];
            state.tasks[date].push({ ...taskData, date, id: ulid() });
        },
        removeTask: (state, action: PayloadAction<{ taskId: string; date: string }>) => {
            const { taskId, date } = action.payload;
            const tasksForDate = state.tasks[date];

            if (tasksForDate) {
                state.tasks[date] = tasksForDate.filter((task) => task.id !== taskId);
            }
        },

        updateTask: (state, action: PayloadAction<{ taskId: string; date: string; updatedTask: ITask }>) => {
            const { taskId, date, updatedTask } = action.payload;
            const tasksForDate = state.tasks[date];

            if (tasksForDate) {
                const updatedTasks = tasksForDate.map((task) =>
                    task.id === taskId ? { ...updatedTask, id: taskId } : task
                );

                state.tasks = { ...state.tasks, [date]: updatedTasks };
            }
        },
        updateTasks: (state, action: PayloadAction<{ tasks: { [date: string]: ITask[] } }>) => {
            const tasks = action.payload;
            state.tasks = tasks;
        },

        //TAGS
        updateTags: (state, action: PayloadAction<ITag[]>) => {
            const tags = action.payload;
            state.tags = tags.reduce((acc, tag) => ({ ...acc, [tag.id]: tag }), {});
        },

        // Filter
        updateSearchText: (state, action: PayloadAction<string>) => {
            state.calendarFilter.searchText = action.payload;
        },
        updateTagsFilter: (state, action: PayloadAction<string[]>) => {
            state.calendarFilter.tags = action.payload;
        }

    },
});

export const {
    addTask,
    removeTask,
    updateTask,
    updateTasks,
    updateTags,
    updateSearchText,
    updateTagsFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
