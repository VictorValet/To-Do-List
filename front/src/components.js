export function TaskHeadRow() {
	return (
		<tr>
			<th>Name</th>
			<th>Description</th>
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
