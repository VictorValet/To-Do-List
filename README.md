# Simple to-do list app

## Overview
A simple to-do list application that allows the user to keep tracks of his task list.

## Functionalities
- Add new tasks
- Mark tasks as completed
- Delete tasks

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

The backend plays the role of both a server and an API to keep the configuration minimal and simple.

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
    },
    {
        "id": 2,
        "name": "Task 2",
        "description": "Description for Task 2",
        "status": "completed",
    },
    ...
]
```

* POST /api/createTask
    - Creates a new task in the database.
    - Request body must contain 'name', 'description'.

* POST /api/updateTaskStatus
    - Updates the status of an existing task in the database.
    - Request body must contain 'id' and 'status'.

* DELETE /api/deleteTask
    - Deletes a task from the database.
    - Request body must contain 'id'.
