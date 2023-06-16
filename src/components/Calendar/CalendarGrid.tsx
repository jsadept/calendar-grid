import React, {FC, useEffect, useState} from 'react'
import styled from 'styled-components';
import TaskList from "./Task/TaskList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const taskData = {
    '2023-6-16': [
        {
            id: '1',
            color: 'orange',
            number: '23',
            title: 'Task 1',
            tags: [
                { title: 'Tag1', color: 'red' },
                { title: 'Tag2', color: 'blue' }
            ],
            date: '2023-6-16'
        },
        {
            id: '2',
            color: 'orange',
            number: '23',
            title: 'Task 2',
            tags: [
                { title: 'Tag4', color: 'red' },
                { title: 'Tag5', color: 'blue' },
                { title: 'Tag6', color: 'orange' },
                { title: 'Tag7', color: 'green' },
            ],
            date: '2023-6-16'
        },
        {
            id: '4',
            color: 'orange',
            number: '23',
            title: 'Task 2',
            tags: [
                { title: 'Tag4', color: 'red' },
                { title: 'Tag5', color: 'blue' },
                { title: 'Tag6', color: 'orange' },
                { title: 'Tag7', color: 'green' },
            ],
            date: '2023-6-16'
        }
    ],
    '2023-6-15': [
        {
            id: '3',
            color: 'orange',
            number: '23',
            title: 'Task 3',
            tags: [
                { title: 'Tag1', color: 'red' },
                { title: 'Tag2', color: 'blue' }
            ],
            date: '2023-6-16'
        },
    ]
}

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

    const [tasks, setTasks] = useState(taskData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const sourceTasks = tasks[source.droppableId];
        const draggedTask = sourceTasks.find((task) => task.id === draggableId);
        const updatedSourceTasks = sourceTasks.filter((task) => task.id !== draggableId);

        const updatedTasks = {
            ...tasks,
            [source.droppableId]: updatedSourceTasks.length === 0 ? undefined : updatedSourceTasks,
            [destination.droppableId]: destination.droppableId === source.droppableId
                ? [
                    ...updatedSourceTasks.slice(0, destination.index),
                    draggedTask,
                    ...updatedSourceTasks.slice(destination.index)
                ]
                : (tasks[destination.droppableId]
                        ? [
                            ...tasks[destination.droppableId].slice(0, destination.index),
                            draggedTask,
                            ...tasks[destination.droppableId].slice(destination.index)
                        ]
                        : [draggedTask]
                )
        };

        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <CalendarGridWrapper>
                {WEEKDAYS.map((weekday, index) => (
                    <Weekday key={'weekday-' + index}>{weekday}</Weekday>
                ))}
                {daysForCalendarView.map((day, index) => (
                    <Droppable droppableId={day.date} key={'day-box-' + day.date}>
                        {(provided, snapshot) => (
                            <Day
                                ref={provided.innerRef} {...provided.droppableProps}
                                className={`day ${day.isCurrentMonth && 'currentMonth'} ${day.isWeekend && 'weekend'} ${day.isToday && 'today'}`}
                            >
                                <DayHeader>
                                    <DayNumber>
                                        {day.isFirstOrLastDay ? `${day.currentMonth} ${day.dayOfMonth}` : day.dayOfMonth}
                                    </DayNumber>

                                    { tasks[day.date] &&
                                        <CardAmount>
                                            Cards {tasks[day.date].length}
                                        </CardAmount>
                                    }
                                </DayHeader>

                                <TaskList dayId={day.date} tasks={tasks[day.date] || []} onDragEnd={onDragEnd} />

                                {provided.placeholder}
                            </Day>
                        )}
                    </Droppable>
                ))}
            </CalendarGridWrapper>
        </DragDropContext>
    )
}

export default CalendarGrid
