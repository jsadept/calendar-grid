import {FC} from 'react';
import styled from 'styled-components';
import Task from "./Task";
import {Droppable, DropResult} from "react-beautiful-dnd";
import {useAppSelector} from "../../../hooks/redux";
import {selectFilterTagIds, selectIsShowHolidays, selectSearchText} from "../../../store/task/task-selectors";
import {useGetPublicHolidaysQuery} from "../../../api/publicHolidays";
import Holiday from "../Holiday/Holiday";


interface TaskListProps {
    tasks: ITask[];
    dayId: string;
    onDragEnd: (result: DropResult) => void;
    isExpanded: boolean;
    handleEditClick: (taskId: string) => void;
    tags: ITag[];
}

const TaskListContainer = styled.div`
  overflow: auto;
  max-height: 220px;
  height: 100%;
  &.expanded {
    max-height: 300px;
  }
`;

const TaskList: FC<TaskListProps> = ({ tasks, dayId, onDragEnd, isExpanded, handleEditClick, tags}) => {
    const searchText: string = useAppSelector(selectSearchText);
    const filterTagIds: string[] = useAppSelector(selectFilterTagIds);
    const isShowHolidays: boolean = useAppSelector(selectIsShowHolidays);

    const { data: holidays } = useGetPublicHolidaysQuery();

    return (
        <Droppable droppableId={dayId}>
            {(provided) => (
                <TaskListContainer ref={provided.innerRef} {...provided.droppableProps} className={`${dayId} ${isExpanded && 'expanded'}`}>

                    {holidays && holidays[dayId] && holidays[dayId].map((holiday) => {
                        return (
                            isShowHolidays && <Holiday
                                key={holiday.date+holiday.name}
                                holidayId={holiday.date+holiday.name}
                                title={holiday.name}
                            />
                        )
                    })}

                    {tasks && tasks.length > 0 && tasks.map((task, index) => {

                        // filter tasks by search text
                        const isTaskMatchingSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
                        // filter tasks by tags
                        const isTaskMatchingTags = filterTagIds.length === 0 || task.tagIds?.some(tagId => filterTagIds.includes(tagId));

                        return (isTaskMatchingSearch && isTaskMatchingTags &&
                            <Task
                                key={task.id}
                                taskId={task.id}
                                title={task.title}
                                taskCheckedTagsIds={task.tagIds || []}
                                tags={tags}
                                index={index}
                                onDragEnd={onDragEnd}
                                handleEditClick={handleEditClick}
                            />
                        )}
                    )}
                    {provided.placeholder}
                </TaskListContainer>
            )}
        </Droppable>
    );
};


export default TaskList;
