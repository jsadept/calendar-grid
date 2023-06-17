import styled from 'styled-components';
import {FC} from "react";

type HolidayProps = {
    holidayId: string;
    title?: string;
};

const HolidayWrapper = styled.div`
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

const Tag = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  margin-bottom: 5px;
  width: 100%;
  height: 20px;
  font-size: 14px;
`;

const Title = styled.div`
  margin-top: 10px;
`;

const Holiday: FC<HolidayProps> = ({
     title,
 }) => {


    return (
        <HolidayWrapper>
            <Tag color={"#5f1ebe"} >Holiday</Tag>
            <Title>{title}</Title>
        </HolidayWrapper>
    );
};

export default Holiday;
