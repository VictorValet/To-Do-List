export function aWeekAway() {
	const currentDate = new Date();
	const dueDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
	return dueDate.toISOString().split('T')[0];
}

export function getRowCssClass(task, index) {
	const evenOdd = index % 2 === 0 ? "even" : "odd";
	let cssClass = "";
	if (task.status === "completed" || task.status === "overdue") {
		cssClass = `${task.status}-${evenOdd} `;	
	}
	cssClass += `priority-${task.priority}`;
	return cssClass;
}
