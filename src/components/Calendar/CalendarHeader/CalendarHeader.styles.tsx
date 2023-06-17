import styled from "styled-components";
import Select from "react-select";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 56px;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  color: #172b4d;
  border-radius: 5px 5px 0 0;
  padding: 40px 20px;
    @media (max-width: 998px) {
        flex-direction: column;
    }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const CenterSection = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 24px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  font-size: 14px;
  background-color: rgb(241, 242, 244);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgb(220, 223, 228);
    transition: background-color 0.3s ease;
    color: inherit;
  }
`;

export const CloseButton = styled.button`
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

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  height: 39px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ImportButton = styled(Button)`
  background-color: #6ec178;
  color: #fff;
`;

export const ExportButton = styled(Button)`
  background-color: #f5a623;
  color: #fff;
`;

export const DownloadButton = styled(Button)`
  background-color: #5e6c84;
  color: #fff;
`;

export const ToggleHolidaysButton = styled(Button)`
  background-color: #b875c9;
  color: #fff;
`;

export const FilterByTagsButton = styled(Button)`
  background-color: #4e8bbd;
  color: #fff;
`;

export const TagFilterModal = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 200px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 99999;
`;

export const TagFilterTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
`;

export const TagFilterSelect = styled(Select)`
  margin-bottom: 10px;
`;
export const StyledSelect = styled(Select)`
  width: 200px;
  color: #333;
  border-radius: 5px;
  margin-right: 10px;

  /* Webkit-based browsers */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
