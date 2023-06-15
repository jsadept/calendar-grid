import React, { FC } from 'react';
import styled from 'styled-components';

type CalendarHeaderProps = {
    selectedYear: number;
    selectedMonth: number;
    onPrevClick: () => void;
    onNextClick: () => void;
    onCurrentClick: () => void;
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  color: #172b4d;
  border-radius: 5px 5px 0 0;
  padding: 40px 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;


const CenterSection = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 24px;
`;

const RightSection = styled.div``;

const Button = styled.button`
  font-size: 14px;
  background-color: rgb(241, 242, 244);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgb(220, 223, 228);
    transition: background-color 0.3s ease;
    color: inherit;
  }
`;

// check fix
const CloseButton = styled.button`
  font-size: 14px;
  background-color: rgb(241, 242, 244);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: rgb(220, 223, 228);
    transition: background-color 0.3s ease;
    color: inherit;
  }
`;

const CalendarHeader: FC<CalendarHeaderProps> = ({
    selectedYear,
    selectedMonth,
    onPrevClick,
    onNextClick,
    onCurrentClick,
}) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <HeaderWrapper>
            <LeftSection>
                <Button onClick={onPrevClick}> {"<"} </Button>
                <Button onClick={onCurrentClick}>Current</Button>
                <Button onClick={onNextClick}> {">"} </Button>
            </LeftSection>
            <CenterSection>
                {months[selectedMonth]} {selectedYear}
            </CenterSection>
            <RightSection>
                <CloseButton>&times;</CloseButton>
            </RightSection>
        </HeaderWrapper>
    );
};

export default CalendarHeader;
