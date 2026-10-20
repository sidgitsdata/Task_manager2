# Student Task Manager

A simple and responsive web application designed to help students organize and manage their academic tasks efficiently.

## About the Project

Student Task Manager allows students to create tasks, organize them by subject, set due dates and priorities, and track their completion status. The application stores task data in the browser using LocalStorage.

## Features

- **Dashboard:** View total, pending, and completed tasks.
- **Add Tasks:** Create tasks with a title, subject, due date, and priority.
- **Edit Tasks:** Update existing task details.
- **Delete Tasks:** Remove tasks with a confirmation prompt.
- **Task Status:** Mark tasks as completed or pending.
- **Task Filters:** View all tasks, pending tasks, or completed tasks.
- **Local Storage:** Save tasks in the browser so they remain available after refreshing the page.
- **Responsive Design:** Use the interface on different screen sizes.
- **Privacy and Terms:** Dedicated sections for privacy information and terms of use.

## Technologies Used

- HTML5 — webpage structure
- CSS3 — styling and responsive layout
- JavaScript — application logic and task management
- Browser LocalStorage — client-side data persistence

## Project Structure

```text
Task_manager2/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Start adding and managing your academic tasks.

No backend server or database setup is required for the current version.

## How Data Is Stored

The application uses the browser's LocalStorage to store task information. Data remains available in the same browser on the same device after a page refresh. Clearing browser storage or changing browsers or devices may remove or make the saved tasks unavailable.

## Limitations

- Tasks are stored locally in the browser.
- There is no user authentication or cloud synchronization.
- Tasks are not automatically shared between devices.

## Future Enhancements

- Search tasks by title or subject.
- Sort tasks by due date and priority.
- Add reminders and notifications.
- Add monthly task summaries.
- Introduce user accounts and cloud storage.

## Project Purpose

This project demonstrates practical frontend web development concepts, including HTML structure, CSS styling, JavaScript event handling, DOM manipulation, and browser-based data storage.

## Author

**Siddharth Sharma**

## License

This project is intended for educational and learning purposes. A formal open-source license has not been specified.
