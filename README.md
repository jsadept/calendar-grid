Task Manager
============

[![GitHub issues](https://img.shields.io/github/issues/your-username/task-manager)](https://github.com/jsadept/calendar-grid/issues)
[![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/jsadept/calendar-grid)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://calendar-grid.netlify.app/)

The Task Manager is a calendar grid application that allows users to create and organize tasks effectively.

## Features

- Create and edit tasks within calendar cells (days) using inline editing.
- Drag and drop tasks to move them between days (calendar cells).
- Rearrange tasks within a single cell using drag and drop.
- Filter tasks in the calendar using text search.
- Create and edit labels for tasks, including color and text.
- Assign multiple labels to a task.
- Filter tasks by labels.
- Import and export the calendar to a file (e.g., JSON or other formats).
- Ability to save the calendar as an image.
- Display world holidays for each day in the calendar. The holiday name should be associated with the cell and should not participate in the rearrangement.
- Utilize the [API](https://date.nager.at/swagger/index.html) for retrieving holiday data.

## Tech Stack

- TypeScript
- React
- Redux Toolkit
- React Hooks
- Styled-Components
- react-beautiful-dnd
- react-select
- html2canvas
- ulid
- Vite


---

## Screenshots
Table

![Table](https://i.imgur.com/oFPWkPy.png)


---


## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager.git

# Navigate to the project directory
cd task-manager

# Install dependencies
npm install
```

## Development

```bash
# Runs the app in development mode
npm run dev
```

## Production

```bash
# Builds a production-ready version of the app
npm run build

# Serves the content from the build folder
npm run start
```

## License

This project is licensed under the terms of the **MIT** license.
