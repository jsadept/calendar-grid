import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ITaskState} from "./task-types";
import { ulid } from 'ulid'


const DEMO_TASKS_DATA = {
    '2023-6-16': [
        {
            id: '1',
            title: 'Task 1',
            tags: [
                { title: 'Tag4', color: '#00C3E1', checked: true },
                { title: 'Tag6', color: '#C376E0', checked: true },
            ],
            date: '2023-6-16'
        },
        {
            id: '2',
            title: 'Task 2',
            tags: [
                { title: 'Tag1', color: '#FFAB49', checked: true },
                { title: 'Tag2', color: '#60BE50', checked: true },
                { title: 'Tag3', color: '#0378BE', checked: true },
            ],
            date: '2023-6-16'
        }
    ],
    '2023-6-12': [
        {
            id: '3',
            title: 'Task 3',
            tags: [
                { title: 'Tag2', color: '#60BE50', checked: true },
                { title: 'Tag3', color: '#0378BE', checked: true },
            ],
            date: '2023-6-16'
        },
    ]

}

const initialState: ITaskState = {
    tasks: DEMO_TASKS_DATA,
    filteredTasks: {},
    calendarFilter: {
        searchText: '',
        tags: [],
    }
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            const { date, ...taskData } = action.payload;
            state.tasks[date] = state.tasks[date] || [];
            state.tasks[date].push({ ...taskData, date, id: ulid() });
        },
        // removeTask: (state, action: PayloadAction<{ taskId: string; date: string }>) => {
        //     const { taskId, date } = action.payload;
        //     if (state.tasks[date]) {
        //         state.tasks[date] = state.tasks[date].filter((task) => task.id !== taskId);
        //     }
        // },
        // updateTask: (
        //     state,
        //     action: PayloadAction<{ taskId: string; date: string; updatedTask: Partial<ITask> }>
        // ) => {
        //     const { taskId, date, updatedTask } = action.payload;
        //     if (state.tasks[date]) {
        //         const taskIndex = state.tasks[date].findIndex((task) => task.id === taskId);
        //         if (taskIndex !== -1) {
        //             state.tasks[date][taskIndex] = { ...state.tasks[date][taskIndex], ...updatedTask };
        //         }
        //     }
        // },
        updateTasks: (state, action: PayloadAction<{ tasks: { [date: string]: Task[] } }>) => {
            const tasks = action.payload;
            state.tasks = tasks;
        },
    },
});

export const {
    addTask,
    removeTask,
    updateTask,
    setTasks,
    updateTasks,
} = taskSlice.actions;

export default taskSlice.reducer;


