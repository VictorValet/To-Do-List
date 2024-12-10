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

export function TaskList({ tasks, getRowCssClass }){
	return (tasks.map((task, index) => (
		<tr key={task.id} className={getRowCssClass(task, index)}>
			<td>{task.name}</td>
			<td>{task.description}</td>
			<td>{task.status}</td>
			<td></td>
		</tr>
	)));
}
