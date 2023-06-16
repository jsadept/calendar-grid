export interface ITaskState {
    tasks: { [date: string]: ITask[] };
    filteredTasks: { [date: string]: ITask[] };
    calendarFilter: {
        searchText: string;
        tags: string[];
    };
}
