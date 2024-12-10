# ToDo List app

## Overview
A simple to-do list application that allows the user to keep tracks of his task list.

## Functionalities
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Give a task a due date
- Give a task a priority level
- Search tasks by name
- Sort tasks by name, due date or priority

## To Run
Ensure you have docker installed on your machine then:
```
git clone git@github.com:VictorValet/ToDo-List.git
cd ToDo-List
bash env-setup.sh
docker compose up --build
```
Access the interface at [http://localhost:5000](http://localhost:5000) 

## Stack
- Backend: Node.js
- Frontend:
  * React
  * Bootstrap
- Database: PostgreSQL

The backend plays the role of both a server and an API, to keep the configuration minimal and simple.

## API
* GET /api/getTasks
    - Fetches all tasks from the database.
    - Returns an array of rows as json objects:
```
[
    {
        "id": 1,
        "name": "Task 1",
        "description": "Description for Task 1",
        "status": "pending",
		"due_date": "2023-10-02",
		"priority": 3
    },
    {
        "id": 2,
        "name": "Task 2",
        "description": "Description for Task 2",
        "status": "completed",
		"due_date": "2024-10-02",
		"priority": 1
    },
    ...
]
```

* POST /api/createTask
    - Creates a new task in the database.
    - Request body must contain 'name', 'dueDate' and 'priority' and can contain 'description'.

* POST /api/updateTaskStatus
    - Updates the status of an existing task in the database.
    - Request body must contain 'id' and 'status'.

* DELETE /api/deleteTask
    - Deletes a task from the database.
    - Request body must contain 'id'.

# Ameliorations
- Migration handling for the database modifications (Back)
- Better error handling (Back/Front)
- Add user identification (Back/Front)
- Add testing (Back/Front)
- Enhance security (Back/Front)
- Make 'deleteTask' just marking tasks as 'deleted' and make 'getTasks' filter these out (Back)
- Add a mechanism to update overdue tasks only once each day (Back)
- Add a button to rows to return tasks to 'pending' (Front)
- Add a dropdown to rows to modify priorities after task creation (Back/Front)
- Add a tickbox to rows and global buttons to batch delete or update tasks (Back/Front)
- Better priorities mapping (Back/Front)
