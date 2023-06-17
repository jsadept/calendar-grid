import React, {FC, useState, useMemo, useRef} from 'react';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import CalendarGrid from './CalendarGrid/CalendarGrid';

import { createDaysForCalendarView } from '../../helpers/dateHelpers';
import {WEEKDAYS_ARRAY} from "../../constants";
import useComponentToImage from "../../hooks/useComponentToImage";
import {useGetPublicHolidaysQuery} from "../../api/publicHolidays";


const Calendar: FC = () => {
    const today = new Date();
    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth();
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    const calendarRef = useRef<HTMLDivElement | null>(null);
    const downloadImage = useComponentToImage(calendarRef);

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

    const handleDownloadImage = () => {
        downloadImage();
    };

    return (
        <div ref={calendarRef}>
            <CalendarHeader
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onPrevClick={goToPrevMonth}
                onNextClick={goToNextMonth}
                onCurrentClick={goToCurrentMonth}
                handleDownloadImage={handleDownloadImage}
            />
            <CalendarGrid daysForCalendarView={daysForCalendarView} WEEKDAYS={WEEKDAYS_ARRAY} />
        </div>
    );
};

export default Calendar;
