import React from 'react';
import styled from 'styled-components';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const TaskListContainer = styled.div`
  max-height: 120px;
  overflow: auto;
`;

const TaskList: React.FC = ({ tasks, dayId, onDragEnd }) => {
    return (
        <Droppable droppableId={dayId}>
            {(provided, snapshot) => (
                <TaskListContainer ref={provided.innerRef} {...provided.droppableProps}>
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
