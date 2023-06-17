import {FC, useCallback} from 'react'
import styled from 'styled-components';
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {updateTasks} from "../../../store/task/task-slice";
import CalendarDay from "../CalendarDay/CalendarDay";
import {selectTagsArray, selectTasks} from "../../../store/task/task-selectors";


type CalendarGridProps = {
    daysForCalendarView: IDay[]
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

const CalendarGrid: FC<CalendarGridProps> = ({ daysForCalendarView, WEEKDAYS }) => {

    const dispatch = useAppDispatch();
    const tasks: { [date: string]: ITask[] } = useAppSelector(selectTasks);
    const tags = useAppSelector(selectTagsArray);

    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const sourceTasks = tasks[source.droppableId as string | number];
        const draggedTask = sourceTasks.find((task: ITask) => task.id === draggableId);
        const updatedSourceTasks = sourceTasks.filter((task: ITask) => task.id !== draggableId);

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
        if (updatedSourceTasks.length === 0) {
            delete updatedTasks[source.droppableId];
        }

        dispatch(updateTasks(updatedTasks as { [date: string]: ITask[] }));
    }, [tasks, dispatch]);

    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <CalendarGridWrapper>
                {WEEKDAYS.map((weekday, index) => (
                    <Weekday key={'weekday-' + index}>{weekday}</Weekday>
                ))}
                {daysForCalendarView.map((day) => {
                    return (
                        <Droppable droppableId={day.date} key={'day-box-' + day.date}>
                            {(provided) => (
                                <CalendarDay
                                    day={day}
                                    tasks={tasks[day.date] || []}
                                    tags={tags}
                                    onDragEnd={onDragEnd}
                                    provided={provided}
                                />
                            )}
                        </Droppable>
                    )
                })}
            </CalendarGridWrapper>
        </DragDropContext>
    )
}

export default CalendarGrid
