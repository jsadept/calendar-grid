import React, {FC, useEffect, useRef, useState} from 'react';
import TaskList from "../Task/TaskList";
import styled from "styled-components";
import AddNewTaskForm from "../../Forms/AddNewTaskForm/AddNewTaskForm";
import useOutsideClick from "../../../hooks/useClickOutside";


interface CalendarDayProps {
    day: IDay;
    tasks: ITask[] | [];
    tags: ITag[];
    onDragEnd: (result: any) => void; // todo fix any
    provided: any; //todo fix any
}

const Day = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 250px;
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
  
  &.expanded {
    height: auto;
    background-color: #cdcdcd;
    z-index: 99999;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.expanded {
    z-index: 99999;
    overflow: visible;
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 350px;
    background-color: #cdcdcd;
    border-radius: 15px;
  }
`;

const NewCardBtn = styled.button`
  align-items: center;
  background-color: #E9EBEE;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  color: var(--ds-text, #172b4d);
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  line-height: 20px;
  padding: 6px 12px;
  text-decoration: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  white-space: normal;
  width: 93%;
  margin: 0 auto 10px;
`;


const CalendarDay: FC<CalendarDayProps> = ({ day, tasks, tags, onDragEnd, provided }) => {
    const [isExpanded, setIsExpanded] = useState(false); // todo: fix add type
    const [showForm, setShowForm] = useState(false); // todo: fix add type
    const [showEditTask, setShowEditTask] = useState<any>(null); // todo: fix add type
    const dayContentRef = useRef(null); // todo: fix add type
    const handleDayClick = () => {
        setIsExpanded(true);
    }



    const handleButtonClick = () => {
        setShowForm(!showForm);
    }

    const closeAll = () => {
        setIsExpanded(false);
        setShowForm(false);
        setShowEditTask(null);
    }


    useOutsideClick(dayContentRef,() => {
        closeAll();
    });


    const handleEditClick = (taskId) => {
        const editTask = tasks.find(task => task.id === taskId);
        setShowEditTask(editTask);
    }
    return (
        <Day
            className={`day ${day.isCurrentMonth && 'currentMonth'} ${day.isWeekend && 'weekend'} ${day.isToday && 'today'} ${isExpanded && 'expanded'}`}
            onClick={handleDayClick}
            ref={dayContentRef}
        >
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
            <DayContent  ref={provided.innerRef} {...provided.droppableProps} className={`${isExpanded && 'expanded'}`}>
                <TaskList
                    dayId={day.date}
                    tasks={tasks}
                    tags={tags}
                    onDragEnd={onDragEnd}
                    isExpanded={isExpanded}
                    handleEditClick={handleEditClick}
                />

                {isExpanded &&
                    <NewCardBtn onClick={handleButtonClick}>Create New Card</NewCardBtn>
                }

                {(showForm || showEditTask !== null) &&
                    <AddNewTaskForm
                        onClose={closeAll}
                        dayId={day.date}
                        task={showEditTask}
                        tags={tags}
                    />
                }

                {provided.placeholder}
            </DayContent>
        </Day>
    );
};

export default CalendarDay;
