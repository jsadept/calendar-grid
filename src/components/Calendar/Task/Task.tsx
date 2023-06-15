import React from 'react';
import styled from 'styled-components';

type TaskProps = {
    taskId?: string;
    color?: string;
    number?: string;
    title?: string;
    tags?: any; //todo: fix type
    onDragStart?: (taskId: string) => void;
    onDragEnd?: (taskId: string, targetIndex: number) => void;
};

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
    color,
    number,
    title,
    tags,
    onDragStart,
    onDragEnd
}) => {




    return (
        <TaskWrapper>
            {tags && (
                <TagsWrapper>
                    {tags.map((tag, index) => (
                        <Tag key={index} color={tag.color} />
                    ))}
                </TagsWrapper>
            )}
            <Title>{title}</Title>
        </TaskWrapper>
    );
};

export default Task;
