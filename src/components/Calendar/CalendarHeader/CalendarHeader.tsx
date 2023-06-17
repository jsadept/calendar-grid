import React, {FC, useEffect, useState} from 'react';
import { MONTHS_ARRAY } from '../../../constants';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTagsArray} from "../../../store/task/task-selectors";
import {convertTagsToOptions} from "../../../helpers/common";
import {
    Button,
    CenterSection, DownloadButton,
    ExportButton, HeaderWrapper,
    ImportButton,
    LeftSection, RightSection,
    SearchInput, StyledSelect, ToggleHolidaysButton
} from "./CalendarHeader.styles";
import {updateSearchText, updateTagsFilter} from "../../../store/task/task-slice";
import useStoreImportExportTasks from "../../../hooks/useStoreImportExport";

interface CalendarHeaderProps {
    selectedYear: number;
    selectedMonth: number;
    onPrevClick: () => void;
    onNextClick: () => void;
    onCurrentClick: () => void;
    handleDownloadImage: () => void;
}

const CalendarHeader: FC<CalendarHeaderProps> = ({
    selectedYear,
    selectedMonth,
    onPrevClick,
    onNextClick,
    onCurrentClick,
    handleDownloadImage
}) => {

    const dispatch = useAppDispatch();

    const tagOptions = useAppSelector(selectTagsArray);
    const {handleExportStore, handleImportStore, fileInputRef} = useStoreImportExportTasks();
    const [showHolidays, setShowHolidays] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedTagOptions, setSelectedTagOptions] = useState([]);

    const handleTagSelect = (selectedOptions) => {
        setSelectedTagOptions(selectedOptions);
    };

    const handleToggleHolidays = () => {
        setShowHolidays(!showHolidays);
    }

    const handleSearchInputChange = (e) => {
        setSearchInputValue(e.target.value);
    }


    const formatValueLabel = (selectedOptions) => {
        if (selectedOptions.length === 1) {
            return selectedOptions[0].label;
        } else if (selectedOptions.length > 1) {
            return `${selectedOptions.length} selected`;
        }
        return '';
    };

    useEffect(() => {
        dispatch(updateSearchText(searchInputValue));
    }, [searchInputValue]);

    useEffect(() => {
        const selectedTagIds = selectedTagOptions.map(option => option.id.toString());
        dispatch(updateTagsFilter(selectedTagIds));
    }, [selectedTagOptions]);

    const handleDownloadStore = () => {
        handleExportStore();
    }

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    return (
        <HeaderWrapper>
            <LeftSection>
                <Button onClick={onPrevClick}> {'<'} </Button>
                <Button onClick={onCurrentClick}>Current</Button>
                <Button onClick={onNextClick}> {'>'} </Button>
            </LeftSection>
            <CenterSection>
                {MONTHS_ARRAY[selectedMonth]} {selectedYear}
            </CenterSection>
            <RightSection>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchInputValue}
                    onChange={handleSearchInputChange}
                />
                <StyledSelect
                    isMulti
                    placeholder="Filter by tags"
                    name="tagFilter"
                    options={convertTagsToOptions(tagOptions)}
                    value={selectedTagOptions}
                    onChange={handleTagSelect}
                    formatValueLabel={formatValueLabel}
                    classNamePrefix="select"
                    styles={{
                        valueContainer: (base) => ({
                            ...base,
                            overflowX: 'auto',
                            flexWrap: 'unset',
                        }),
                        multiValue: (base) => ({
                            ...base,
                            flex: '1 0 auto',
                        })
                    }}
                />
                <ToggleHolidaysButton onClick={handleToggleHolidays}>
                    {showHolidays ? 'Hide Holidays' : 'Show Holidays'}
                </ToggleHolidaysButton>
                <DownloadButton onClick={handleDownloadImage}>Download as Image</DownloadButton>
                <ImportButton onClick={handleImport}>
                    Import
                    <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleImportStore} accept=".json" />
                </ImportButton>
                <ExportButton onClick={handleDownloadStore}>Export</ExportButton>
            </RightSection>
        </HeaderWrapper>
    );
};

export default CalendarHeader;
