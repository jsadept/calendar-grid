import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {useAppDispatch} from "../../hooks/redux";
import {addTask} from "../../store/task/task-slice";
import {DEFAULT_TAGS} from "../../constants";
import {generateRandomColor} from "../../helpers/common";

interface AddNewTaskFormProps {
    onClose: () => void;
    dayId: string;
}



const FormWrapper = styled.div`
  position: absolute;
  left: 0;
  top: -40px;
  height: 390px;
  width: 100%;
  background-color: #FFFFFF;
  border: 3px solid var(--ds-border, #091e4221);
  border-radius: 0 0 15px 15px;
  box-sizing: border-box;
  color: var(--ds-text-subtle, #5e6c84);
  display: block;
  line-height: 40px;
  margin: 0;
  padding: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;

const FormBlock = styled.div`
  margin-bottom: 5px;
`;

const FormLabel = styled.label`
  margin: 0;
  font-size: 18px;
  line-height: 32px;
  display: block;
`;
const FormInput = styled.input`
    width: 95%;
    height: 40px;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #DCDFE4;
    border-radius: 3px;
    box-sizing: border-box;
    color: #172B4D;
    font-size: 14px;
    line-height: 20px;
    outline: none;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FormHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #DCDFE4;
`;

const FormContent = styled.div`
  flex: 1;
  overflow: auto;
  max-height: 280px;
  padding-top: 20px;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TagInput = styled.input<{ color: string }>`
  flex: 60%;
  height: 25px;
  padding: 5px;
  margin-right: 3%;
  border-radius: 8px;
  border: 0;
  background-color: ${({ color }) => color};
  color: #FFFFFF;
`;

const TagCheckbox = styled.input`
  flex: 20%;
  height: 25px;
  margin-right: 5%;
`;

const TagColorBtn = styled.div`
  flex: 20%;
  height: 25px;
  margin-right: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  align-items: center;
  background-color: #E9EBEE;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  color: #172b4d;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  line-height: 20px;
  padding: 6px 12px;
  text-decoration: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  white-space: normal;
  width: 48%;
`;



const AddNewTaskForm: FC<AddNewTaskFormProps> = ({ onClose, dayId }) => {


    const [tags, setTags] = useState<{ title: string; color: string; checked: boolean }[]>(DEFAULT_TAGS);
    const [title, setTitle] = useState('');
    const dispatch = useAppDispatch();

    // TITLE
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // TAGS
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedTags = [...tags];

        if (e.target.type === 'checkbox') {
            updatedTags[index].checked = e.target.checked;
        } else {
            updatedTags[index].title = e.target.value;
        }

        setTags(updatedTags);
    };

    const handleAddTag = () => {
        const color = generateRandomColor();
        setTags((prevTags) => [
            ...prevTags,
            { title: `Tag${tags.length + 1}`, color, checked: false },
        ]);
    };

    const handleEditTagColor = (color: string) => {
        console.log('Edit color', color);
    }

    // SUBMIT
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a new task object
        const newTask = {
            title,
            tags,
            date: dayId,
        };

        // Dispatch the action to add the task
        dispatch(addTask(newTask));

        // Clear the form and close the modal
        setTitle('');
        setTags(DEFAULT_TAGS);
        onClose();
    };


    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormHeader>
                    <FormTitle>Adding new task...</FormTitle>
                </FormHeader>
                <FormContent>

                    <FormBlock>
                        <FormLabel>Task title</FormLabel>
                        <FormInput type="text" value={title} onChange={handleTitleChange} />
                    </FormBlock>

                    <FormBlock>
                        <FormLabel>Task tags</FormLabel>

                        {tags.map((tag, index) => (
                            <TagWrapper key={index}>
                                <TagCheckbox
                                    type="checkbox"
                                    checked={tag.checked}
                                    onChange={(e) => handleTagsChange(e, index)}
                                />
                                <TagInput
                                    type="text"
                                    value={tag.title}
                                    color={tag.color}
                                    onChange={(e) => handleTagsChange(e, index)}
                                />
                                <TagColorBtn>
                                    <svg
                                        width="21"
                                        height="21"
                                        role="presentation"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z" fill="currentColor"></path>
                                    </svg>
                                </TagColorBtn>
                            </TagWrapper>
                        ))}
                        <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                    </FormBlock>
                </FormContent>
                <FormFooter>
                    <Button type="submit">Add</Button>
                    <Button type="button" onClick={onClose}>Cancel</Button>
                </FormFooter>
            </Form>
        </FormWrapper>
    );
};

export default AddNewTaskForm;
