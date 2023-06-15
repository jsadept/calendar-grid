import React, { FC } from 'react'
import styled from 'styled-components';

type Day = {
    dayOfMonth: number
    isCurrentMonth: boolean
    isWeekend: boolean
    isToday: boolean
    isFirstOrLastDay: boolean
    currentMonth: string
}

type CalendarGridProps = {
    daysForCalendarView: Day[]
    WEEKDAYS: string[]
}

const CalendarGridWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(7, 1fr);
  grid-column: 1 / 7;
  background-color: #ffffff;
  border-radius: 0 0 5px 5px;
  padding: 1rem;
  overflow: hidden;

  @media only screen and (max-width: 425px) {
    padding: 0.5rem;
    gap: 0.25rem;
    border-radius: 1rem;
  }
`;

const Weekday = styled.div`
  text-align: center;
  color: #44546f;
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  @media only screen and (max-width: 425px) {
    font-size: 0.625rem;
    padding: 0.15rem 0.25rem;
  }
`;

const Day = styled.div`
  width: 100%;
  height: 160px;
  cursor: pointer;
  border-radius: 2px;
  background-color: #F7F8F9;

  color: #172B4D;


  &.currentMonth {
    background-color: #e9ebeb;
  }


  &.today {
    border: none;
    background-color: #E9F2FF;
  }

  &:hover {
    background-color: #DCDFE4;
  }

  @media only screen and (max-width: 425px) {
    font-size: 0.625rem;
    border-radius: 0.625rem;
  }
`;

const DayHeader = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    color: #172B4D;
    padding: 10px 0 0 10px;
    font-size: 16px;
`;

const DayNumber = styled.div`
    margin-right: 10px;
    font-weight: 700;
    text-transform: capitalize;
`;

const CardAmount = styled.div`
    font-weight: 100;
  color: #828C91;
  
`;

const CalendarGrid: FC<CalendarGridProps> = ({ daysForCalendarView, WEEKDAYS }) => {


    const handleDragWithinCell = (taskId: string, targetIndex: number) => {
        // dispatch(reorderTask(taskId, targetIndex));
        console.log('handleDragWithinCell', taskId, targetIndex)

    };

    const handleDragToAnotherDay = (taskId: string, targetDate: string) => {
        // dispatch(moveTask(taskId, targetDate));
        console.log('handleDragToAnotherDay', taskId, targetDate)
    };


    return (
        <CalendarGridWrapper>
            {WEEKDAYS.map((weekday, index) => (
                <Weekday key={'weekday-' + index}>{weekday}</Weekday>
            ))}
            {daysForCalendarView.map((day, index) => (
                day.isToday
                    ?   <Day
                            key={'day-box-' + index}
                            className={`day ${day.isCurrentMonth && 'currentMonth'} ${day.isWeekend && 'weekend'} ${day.isToday && 'today'}`}
                        >
                            <DayHeader>
                                <DayNumber>
                                    {day.isFirstOrLastDay ? `${day.currentMonth} ${day.dayOfMonth}` : day.dayOfMonth}
                                </DayNumber>
                                <CardAmount>Cards 1</CardAmount>
                            </DayHeader>
                        </Day>
                    :   <Day
                            key={'day-box-' + index}
                            className={`day ${day.isCurrentMonth && 'currentMonth'} ${day.isWeekend && 'weekend'} ${day.isToday && 'today'}`}
                        >
                            <DayHeader>
                                <DayNumber>
                                    {day.isFirstOrLastDay ? `${day.currentMonth} ${day.dayOfMonth}` : day.dayOfMonth}
                                </DayNumber>
                                <CardAmount>Cards 1</CardAmount>
                            </DayHeader>
                        </Day>
            ))}
        </CalendarGridWrapper>
    )
}

export default CalendarGrid
