import React, { FC, useState, useMemo } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

import { createDaysForCalendarView } from '../../helpers/dateHelpers';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: FC = () => {
    const today = new Date();
    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth();
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    const daysForCalendarView = useMemo(
        () => createDaysForCalendarView(selectedYear, selectedMonth),
        [selectedYear, selectedMonth]
    );

    const goToPrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedYear((prev) => prev - 1);
            setSelectedMonth(11);
        } else {
            setSelectedMonth((prev) => prev - 1);
        }
    };

    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedYear((prev) => prev + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth((prev) => prev + 1);
        }
    };
    const goToCurrentMonth = () => {
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        setSelectedYear(currentYear);
        setSelectedMonth(currentMonth);
    };
    return (
        <div>
            <CalendarHeader
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onPrevClick={goToPrevMonth}
                onNextClick={goToNextMonth}
                onCurrentClick={goToCurrentMonth}
            />
            <CalendarGrid daysForCalendarView={daysForCalendarView} WEEKDAYS={WEEKDAYS} />
        </div>
    );
};

export default Calendar;
