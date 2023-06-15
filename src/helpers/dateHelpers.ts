const TOTAL_CELLS_COUNT = 7 * 5;

const createDayData = (
    year,
    month,
    dayOfMonth,
    isCurrentMonth
) => {
    const dayOfWeek = new Date(year, month, dayOfMonth).getDay();
    const isFirstOrLastDay = dayOfMonth === 1 || dayOfMonth === new Date(year, month + 1, 0).getDate();
    const currentMonth = new Date(year, month).toLocaleString('default', { month: 'long' });

    return {
        date: `${year}-${month + 1}-${dayOfMonth}`,
        dayOfWeek,
        dayOfMonth,
        isCurrentMonth,
        isWeekend: dayOfWeek === 6 || dayOfWeek === 0,
        isToday: new Date(year, month, dayOfMonth).toDateString() === new Date().toDateString(),
        isFirstOrLastDay,
        currentMonth,
    };
};

const createDaysForCurrentMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
        return createDayData(year, month, index + 1, true);
    });
};

const createDaysForPreviousMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfTheMonthWeekday = firstDayOfMonth.getDay() || 7;

    const prevMonthDays = [];

    const indexOfFirstVisibleDayFromPrevMonth =
        -1 * (firstDayOfTheMonthWeekday - 2);

    for (let i = indexOfFirstVisibleDayFromPrevMonth; i <= 0; i++) {
        const dateInPrevMonth = new Date(year, month, i).getDate();
        prevMonthDays.push(createDayData(year, month - 1, dateInPrevMonth, false));
    }

    return prevMonthDays;
};

const createDaysForNextMonth = (year, month) => {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfTheMonthWeekday = lastDayOfMonth.getDay() || 7;

    const nextMonthDays = [];

    const numberOfDaysLeftInLastWeekOfSelectedMonth = 7 - lastDayOfTheMonthWeekday;

    for (let i = 1; i <= numberOfDaysLeftInLastWeekOfSelectedMonth; i++) {
        nextMonthDays.push(createDayData(year, month + 1, i, false));
    }

    return nextMonthDays;
};

export const createDaysForCalendarView = (year, month) => {
    const combinedDays = [
        ...createDaysForPreviousMonth(year, month),
        ...createDaysForCurrentMonth(year, month),
        ...createDaysForNextMonth(year, month),
    ];

    if (combinedDays.length < TOTAL_CELLS_COUNT) {
        const lastDateInArray = combinedDays[combinedDays.length - 1].dayOfMonth;

        let nextDate = new Date(year, month, lastDateInArray + 1).getDate();
        for (let i = combinedDays.length; i < TOTAL_CELLS_COUNT; i++) {
            combinedDays.push(createDayData(year, month + 1, nextDate, false));
            nextDate++;
        }
    }

    return combinedDays;
};


