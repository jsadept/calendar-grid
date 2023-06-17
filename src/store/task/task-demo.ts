export const DEMO_TASKS_DATA = {
    '2023-6-16': [
        {
            id: '1-test-id-tasks',
            title: 'Task 1',
            tagIds: ['1-test-id-tags', '2-test-id-tags'],
            date: '2023-6-16'
        },
        {
            id: '2-test-id-tasks',
            title: 'Task 2',
            tagIds: ['3-test-id-tags', '4-test-id-tags', '5-test-id-tags'],
            date: '2023-6-16'
        }
    ],
    '2023-6-12': [
        {
            id: '3-test-id-tasks',
            title: 'Task 3',
            tagIds: ['3-test-id-tags', '5-test-id-tags'],
            date: '2023-6-12'
        },
    ]
};

export const DEMO_TAGS_DATA = {
    '1-test-id-tags': { id: '1-test-id-tags', title: 'Tag4', color: '#00C3E1', checked: false, isDefault: true },
    '2-test-id-tags': { id: '2-test-id-tags', title: 'Tag6', color: '#C376E0', checked: false, isDefault: true },
    '3-test-id-tags': { id: '3-test-id-tags', title: 'Tag1', color: '#FFAB49', checked: false, isDefault: true },
    '4-test-id-tags': { id: '4-test-id-tags', title: 'Tag2', color: '#60BE50', checked: false, isDefault: true },
    '5-test-id-tags': { id: '5-test-id-tags', title: 'Tag3', color: '#0378BE', checked: false, isDefault: true },
};
