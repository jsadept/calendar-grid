import { FC, useEffect, useState, useRef } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { addTask, removeTask, updateTags, updateTask } from '../../../store/task/task-slice';
import { generateRandomColor } from '../../../helpers/common';
import { ulid } from 'ulid';
import { HexColorPicker } from 'react-colorful';
import {
    Button,
    Form,
    FormBlock,
    FormContent,
    FormFooter,
    FormHeader,
    FormInput,
    FormLabel,
    FormTitle,
    FormWrapper,
    TagCheckbox,
    TagColorBtn,
    TagInput,
    TagWrapper,
    ColorPickerWrapper,
    ColorPickerButtons,
    ColorPickerButton,
} from './AddNewTaskForm.styles';

interface AddNewTaskFormProps {
    onClose: () => void;
    dayId: string;
    task: ITask | null;
    tags: ITag[];
}

const AddNewTaskForm: FC<AddNewTaskFormProps> = ({ onClose, dayId, task, tags }) => {
    const [title, setTitle] = useState<string>('');
    const [formTags, setFormTags] = useState<ITag[]>(tags);
    const [colorPickerColor, setColorPickerColor] = useState<string>('#aabbcc');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [selectedTagIndex, setSelectedTagIndex] = useState<number>(-1);
    const colorPickerRef = useRef(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (task) {
            setTitle(task.title);

            if (tags && tags.length > 0 && task.tagIds) {
                setFormTags(
                    tags.map((tag) => {
                        return {
                            ...tag,
                            checked: task.tagIds?.includes(tag.id) || false,
                        };
                    })
                );
            } else {
                setFormTags(tags);
            }
        }
    }, [tags, task]);

    const resetForm = () => {
        setTitle('');
        setFormTags(tags);
        onClose();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedTags = [...formTags];

        if (e.target.type === 'checkbox') {
            updatedTags[index] = {
                ...updatedTags[index],
                checked: e.target.checked,
            };
        } else {
            updatedTags[index] = {
                ...updatedTags[index],
                title: e.target.value,
            };
        }

        setFormTags(updatedTags);
    };

    const handleAddTag = () => {
        const color = generateRandomColor();
        setFormTags((prevTags) => [
            ...prevTags,
            { id: ulid(), title: `Tag ${prevTags.length + 1}`, color, checked: false, isDefault: false },
        ]);
    };

    const handleColorPickerChange = (color: string) => {
        setColorPickerColor(color);
        if (selectedTagIndex !== -1) {
            const updatedTags = [...formTags];
            updatedTags[selectedTagIndex] = {
                ...updatedTags[selectedTagIndex],
                color,
            };
            setFormTags(updatedTags);
        }
    };

    const handleTagColorBtnClick = (index: number) => {
        setSelectedTagIndex(index);
        setShowColorPicker(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // New task payload
        const newTask = {
            id: task?.id || ulid(),
            title,
            tagIds: formTags.filter((tag) => tag.checked).map((tag) => tag.id),
            date: dayId,
        };
        // Update or create new task
        if (task) {
            dispatch(updateTask({ taskId: task.id, date: dayId, updatedTask: newTask }));
        } else {
            dispatch(addTask(newTask));
        }
        // Update tags
        dispatch(updateTags(formTags));

        resetForm();
    };

    const handleRemoveTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (task) {
            dispatch(removeTask({ taskId: task.id, date: dayId }));
        }

        resetForm();
    };

    const handleCloseColorPicker = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTimeout(
            () => setShowColorPicker(false),
            50
        )
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormHeader>
                    <FormTitle>{task ? 'Edit Task' : 'Add New Task'}</FormTitle>
                </FormHeader>
                <FormContent>
                    <FormBlock>
                        <FormLabel>Task title</FormLabel>
                        <FormInput type="text" value={title} onChange={handleTitleChange} />
                    </FormBlock>
                    <FormBlock>
                        <FormLabel>Task tags</FormLabel>
                        {formTags.map((tag, index) => (
                            <TagWrapper key={index}>
                                <TagCheckbox type="checkbox" checked={tag.checked} onChange={(e) => handleTagsChange(e, index)} />
                                <TagInput
                                    type="text"
                                    value={tag.title}
                                    color={tag.color}
                                    onChange={(e) => handleTagsChange(e, index)}
                                />
                                <TagColorBtn onClick={() => handleTagColorBtnClick(index)}>
                                    <svg
                                        width="21"
                                        height="21"
                                        role="presentation"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </TagColorBtn>
                            </TagWrapper>
                        ))}
                    </FormBlock>
                    {showColorPicker && (
                        <ColorPickerWrapper ref={colorPickerRef}>
                            <HexColorPicker color={colorPickerColor} onChange={handleColorPickerChange} />
                            <ColorPickerButtons>
                                <ColorPickerButton onClick={handleCloseColorPicker}>Apply</ColorPickerButton>
                            </ColorPickerButtons>
                        </ColorPickerWrapper>
                    )}
                </FormContent>
                <FormFooter>
                    <Button type="button" onClick={handleAddTag}>
                        Add Tag
                    </Button>
                    <Button type="button" color={'#FFFFFF'} backgroundColor={'#C70000'} disabled={!task} onClick={handleRemoveTask}>
                        Remove task
                    </Button>
                    <Button type="submit">{task ? 'Update' : 'Create'}</Button>
                    <Button type="button" onClick={onClose}>
                        Cancel
                    </Button>
                </FormFooter>
            </Form>
        </FormWrapper>
    );
};

export default AddNewTaskForm;
