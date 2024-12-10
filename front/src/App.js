import React, { Component } from 'react';
import {
	AlertMessage,
	SearchBar,
	TaskForm,
	TaskHeadRow,
	TaskList
} from './components.js'
import { 
	aWeekAway,
	getRowCssClass
} from './utils';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			name: "",
			description: "",
			showAlert: false,
			alertMessage: "Required: name (must be less than 255 characters), due date, priority.",
			dueDate: aWeekAway(),
			priority: "2",
			searchBar: ""		
		}
  	}

	reinitForm = () => {
		this.setState({
			name: "",
			description: "",
			dueDate: aWeekAway(),
			priority: "2"
		});
	}

	reinitSearchBar = () => {
		this.setState({
			searchBar: ""
		});
	}


	componentDidMount() {
		this.fetchTasks();
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.createTask();
		}
	}

	fetchTasks = () => {
		const url = "http://localhost:5000/api/getTasks";
		fetch(url)
		.then(response => response.json())
		.then(json =>  this.setState({ tasks: json }))
		.catch(error => console.error('Error fetching tasks:', error));
	}

	/**
	 * Creates a new task and refresh the task list.
	 */
	createTask = () => {
		const { name, description, dueDate, priority, showAlert } = this.state;
		if (!name.trim() || name.length > 255 || !dueDate || !priority) {
			console.error("Error in form");
			if (!showAlert) {
				setTimeout(() => {
					this.setState({ showAlert: false });
				}, 3000);
			}
			this.setState({ showAlert: true });
			return;
		}

		const url = "http://localhost:5000/api/createTask"
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, description, dueDate, priority })
		})
		.then(response => response.json())
		.then(() => {
			this.reinitForm();
			this.fetchTasks();
		})
		.catch(error => console.error('Error creating task:', error));
	}

	/**
	 * Update the status of a task and refresh the task list.
	 */
	updateTaskStatus = (taskId, status) => {
		const url = "http://localhost:5000/api/updateTaskStatus";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: taskId, status })
		})
		.then(response => response.json())
		.then(() => this.fetchTasks())
		.catch(error => console.error('Error updating task status:', error));
	}

	/**
	 * Delete a task and refresh the task list.
	 */
	deleteTask = (taskId) => {
		const url = "http://localhost:5000/api/deleteTask";
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id: taskId })
		})
		.then(response => response.json())
		.then(() => this.fetchTasks())
		.catch(error => console.error('Error deleting task:', error));
	}

	render() {
		const { tasks, name, description, dueDate, priority, searchBar, showAlert, alertMessage } = this.state;
		const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(searchBar.toLowerCase()));	

		return (
			<div className="container mt-5">
				<AlertMessage
					showAlert={showAlert}
					alertMessage={alertMessage}
				/>
				<div>
					<h1 className="display-4">Tasklist</h1>
				</div>
				<SearchBar
					searchBar={searchBar}
					handleInputChange={this.handleInputChange}
					reinitSearchBar={this.reinitSearchBar}
				/>
				<table className="table table-striped">
					<thead className="thead-light">
						<TaskHeadRow/>
					</thead>
					<tbody>
						<TaskForm
							name={name}
							description={description}
							dueDate={dueDate}
							priority={priority}
							handleInputChange={this.handleInputChange}
							handleKeyPress={this.handleKeyPress}
							createTask={this.createTask}
						/>
						<TaskList
							tasks={filteredTasks}
							updateTaskStatus={this.updateTaskStatus}
							deleteTask={this.deleteTask}
							getRowCssClass={getRowCssClass}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
