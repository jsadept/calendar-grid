import React from 'react';
import styled from 'styled-components';

const TaskListContainer = styled.div`
  max-height: 120px;
  overflow: auto;
`;

const TaskList: React.FC = ({ children }) => {
    return <TaskListContainer>{children}</TaskListContainer>;
};

export default TaskList;
