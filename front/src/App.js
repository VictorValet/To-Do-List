import React, { Component } from 'react';
import {
	TaskHeadRow,
	TaskList
} from './components.js'
import { 
	getRowCssClass
} from './utils';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
		}
  	}

	componentDidMount() {
		this.fetchTasks();
	}

	fetchTasks = () => {
		const url = "http://localhost:5000/api/getTasks";
		fetch(url)
		.then(response => response.json())
		.then(json =>  this.setState({ tasks: json }))
		.catch(error => console.error('Error fetching tasks:', error));
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
		.then(() => this.componentDidMount())
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
		.then(() => this.componentDidMount())
		.catch(error => console.error('Error deleting task:', error));
	}

	render() {
		const { tasks } = this.state;
		
		return (
			<div className="container mt-5">
				<div>
					<h1 className="display-4">Tasklist</h1>
				</div>
				<table className="table table-striped">
					<thead className="thead-light">
						<TaskHeadRow/>
					</thead>
					<tbody>
						<TaskList
							tasks={tasks}
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
