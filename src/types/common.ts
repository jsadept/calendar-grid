
interface IDay {
    dayOfMonth: number;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    isToday: boolean;
    isFirstOrLastDay: boolean;
    currentMonth: string;
    date: string;
};


interface ITask {
    id: string;
    title: string;
    tags: ITag[];
    priority?: number;
    date: string;
}


interface ITag {
    title: string;
    color: string;
}
