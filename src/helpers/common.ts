export const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
};


export const convertTagsToOptions = (tagOptions: ITag[]): OptionType[] => {
        return tagOptions.map((tag) => ({
            value: tag.id,
            label: tag.title,
            id: tag.id,
            color: tag.color,
            checked: tag.checked,
            isDefault: tag.isDefault,
        }));
    };
