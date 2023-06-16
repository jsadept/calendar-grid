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

const TaskList: React.FC = ({ tasks, dayId, onDragEnd, isExpanded }) => { //todo fix type
    return (
        <Droppable droppableId={dayId}>
            {(provided, snapshot) => (
                <TaskListContainer ref={provided.innerRef} {...provided.droppableProps} className={`${isExpanded && 'expanded'}`}>
                    {tasks && tasks.map((task, index) => (
                        <Task
                            key={task.id}
                            taskId={task.id}
                            color={task.color}
                            number={task.number}
                            title={task.title}
                            tags={task.tags}
                            index={index}
                            onDragEnd={onDragEnd}
                        />
                    ))}
                    {provided.placeholder}
                </TaskListContainer>
            )}
        </Droppable>
    );
};


export default TaskList;
