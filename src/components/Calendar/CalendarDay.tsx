import React, {FC} from 'react';
import TaskList from "./Task/TaskList";
import styled from "styled-components";


interface CalendarDayProps {
    day: IDay;
    tasks: ITask[] | [];
    onDragEnd: (result: any) => void; // fix any
    provided: any; // fix any
}

const Day = styled.div`
  display: flex;
  flex-direction: column; 
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

const DayContent = styled.div`
  flex: 1; 
`;



const CalendarDay: FC<CalendarDayProps> = ({ day, tasks, onDragEnd, provided }) => {
    return (
        <Day className={`day ${day.isCurrentMonth && 'currentMonth'} ${day.isWeekend && 'weekend'} ${day.isToday && 'today'}`}>
            <DayHeader>
                <DayNumber>
                    {day.isFirstOrLastDay ? `${day.currentMonth} ${day.dayOfMonth}` : day.dayOfMonth}
                </DayNumber>
                {tasks && tasks[day.date] && tasks[day.date].length > 0 &&
                    <CardAmount>
                        Cards {tasks[day.date].length}
                    </CardAmount>
                }
            </DayHeader>
            <DayContent ref={provided.innerRef} {...provided.droppableProps}>
                <TaskList dayId={day.date} tasks={tasks} onDragEnd={onDragEnd}/>
                {provided.placeholder}
            </DayContent>
        </Day>
    );
};

export default CalendarDay;
