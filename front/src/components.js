const priorities = {
	1: "High",
	2: "Medium",
	3: "Low"
}

export function AlertMessage({ showAlert, alertMessage }) {
	if (!showAlert) {
		return "";
	} else {
		return (
			<div className="alert alert-danger alert-dismissible fade show" role="alert">
				{alertMessage}
			</div>
		);
	}
}

export function TaskForm({ name, description, dueDate, priority, handleInputChange, handleKeyPress, createTask }) {
	return (
		<tr>
			<td>
				<input
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					className="form-control"
					placeholder="Enter task name"
					autoFocus
				/>
			</td>
			<td>
				<input
					type="text"
					id="description"
					name="description"
					value={description}
					onChange={handleInputChange}
					onKeyPress={handleKeyPress}
					className="form-control"
					placeholder="Enter task description"
				/>
			</td>
			<td>
				<input
					type="date"
					id="dueDate"
					name="dueDate"
					value={dueDate}
					onChange={handleInputChange}
					className="form-control"
				/>
			</td>
			<td>
				<select
					id="priority"
					name="priority"
					value={priority}
					onChange={handleInputChange}
					className="form-control"
				>
					<option value="3">{priorities[3]}</option>
					<option value="2">{priorities[2]}</option>
					<option value="1">{priorities[1]}</option>
				</select>
			</td>
			<td></td>
			<td>
				<button type="button" className="btn btn-primary" onClick={createTask}>Create Task</button>
			</td>
		</tr>
	);
}

export function TaskHeadRow() {
	return (
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Due date</th>
			<th>Priority</th>
			<th>Status</th>
			<th>Actions</th>
		</tr>
	);
}

export function TaskList({ tasks, updateTaskStatus, deleteTask, getRowCssClass }){
	return (tasks.map((task, index) => (
		<tr key={task.id} className={getRowCssClass(task, index)}>
			<td>{task.name}</td>
			<td>{task.description}</td>
			<td>{new Date(task.due_date).toLocaleDateString()}</td>
			<td>{priorities[task.priority]}</td>
			<td>{task.status}</td>
			<td>
				<div className="d-flex justify-content-between">
					<button
						type="button"
						className="btn btn-success"
						onClick={() => updateTaskStatus(task.id, "completed")}
						disabled={task.status === "completed"}
					>
						<i className="bi bi-check"></i>
					</button>
					<button type="button" className="btn btn-danger" onClick={() => deleteTask(task.id)}>
						<i className="bi bi-trash"></i>
					</button>
				</div>
			</td>
		</tr>
	)));
}
