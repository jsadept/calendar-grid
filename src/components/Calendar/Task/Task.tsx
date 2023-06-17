import React from 'react';
import styled from 'styled-components';
import {Draggable, DropResult} from "react-beautiful-dnd";

interface TaskProps {
    taskId: string;
    index: number;
    title?: string;
    tags: ITag[];
    taskCheckedTagsIds: string[] | [];
    onDragEnd?: (result: DropResult) => void;
    handleEditClick: (taskId: string) => void;
}

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90px;
  overflow: auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  width: 92%;
  margin: 0 auto 5px;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
  width: 18%;
  height: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
`;

const Task: React.FC<TaskProps> = ({
    taskId,
    index,
    title,
    tags,
    taskCheckedTagsIds,
    onDragEnd,
    handleEditClick
}) => {
    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        handleEditClick(taskId);
    }
    return (
        <Draggable draggableId={taskId} index={index} onDragEnd={onDragEnd}>
            {(provided) => {
                return (
                    <TaskWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={handleOnClick}
                    >
                        {tags && (
                            <TagsWrapper>
                                {tags.filter((tag) => taskCheckedTagsIds && taskCheckedTagsIds.includes(tag.id)).map((tag, index) => (
                                    <Tag key={'tag'+taskId+index} color={tag.color} />
                                ))}
                            </TagsWrapper>
                        )}
                        <Title>{title}</Title>
                    </TaskWrapper>
                );
            }}
        </Draggable>

    );
};

export default Task;
