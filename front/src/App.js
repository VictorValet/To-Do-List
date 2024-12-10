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
							getRowCssClass={getRowCssClass}
						/>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
