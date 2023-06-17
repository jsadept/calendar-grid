import { useRef } from 'react';
import {importData} from "../store/task/task-slice";
import {useAppDispatch, useAppSelector} from "./redux";
import {selectTasksState} from "../store/task/task-selectors";

const useStoreImportExportTasks = () => {
    const store = useAppSelector(selectTasksState);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleExportStore = () => {
        const json = JSON.stringify(store);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'calendar_tasks_data.json';
        link.click();
    };

    const handleImportStore = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const contents = event.target?.result;
                if (typeof contents === 'string') {
                    try {
                        const importedStore = JSON.parse(contents);
                        const keys = Object.keys(importedStore);
                        const isMatching = keys.every(key => key in store);
                        if (isMatching) {
                            dispatch(importData(importedStore));
                        } else {
                            // show alert error
                            console.error('Imported store does not match the current store.');
                        }
                    } catch (error) {
                        // show alert error
                        console.error('Error parsing imported store:', error);
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return { handleExportStore, handleImportStore, fileInputRef };
};

export default useStoreImportExportTasks;
