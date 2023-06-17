
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
    tagIds?: string[];
    priority?: number;
    date: string;
}


interface ITag {
    id: string;
    title: string;
    color: string;
    checked?: boolean;
    isDefault?: boolean;
}

interface ITagList {
    [key: string]: ITag
}



type OptionType = {
    value: string;
    label: string;
};


interface PublicHoliday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: string[];
    launchYear: number;
    types: string[];
}
