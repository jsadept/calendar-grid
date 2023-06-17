import React from 'react';
import styled from 'styled-components';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const TaskListContainer = styled.div`
  overflow: auto;
  max-height: 120px;
  height: 100%;
  &.expanded {
    max-height: 300px;
  }
`;

const TaskList: React.FC = ({ tasks, dayId, onDragEnd, isExpanded, handleEditClick, tags}) => { //todo fix type
    return (
        <Droppable droppableId={dayId}>
            {(provided, snapshot) => (
                <TaskListContainer className={dayId} ref={provided.innerRef} {...provided.droppableProps} className={`${isExpanded && 'expanded'}`}>
                    {tasks && tasks.length > 0 && tasks.map((task, index) => (
                        <Task
                            key={task.id}
                            taskId={task.id}
                            title={task.title}
                            taskCheckedTagsIds={task.tagIds}
                            tags={tags}
                            index={index}
                            onDragEnd={onDragEnd}
                            handleEditClick={handleEditClick}
                        />
                    ))}

                    {provided.placeholder}
                </TaskListContainer>
            )}
        </Droppable>
    );
};


export default TaskList;
