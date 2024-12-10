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

export function getSortButtonCssClass(name, sortBy, sortOrder) {
	if (name !== sortBy) {
		return "bi bi-chevron-expand";
	} else {
		if (sortOrder === 1) {
			return "bi bi-chevron-down";
		} else {
			return "bi bi-chevron-up";
		}
	}
}

/**
 * Uses sortBy and sortOrder to sort taskList.
 * Returns the sorted list.
 */
export function getSortedTaskList(taskList, sortBy, sortOrder) {
	return taskList.sort((a, b) => {
	
		let aValue = a[sortBy];
		let bValue = b[sortBy];
	
		if (sortBy === "due_date") {
			aValue = new Date(aValue);
			bValue = new Date(bValue);
		}
	
		if (aValue < bValue) {
			return -1 * sortOrder;
		} else if (aValue > bValue) {
			return 1 * sortOrder;
		} else {
			return 0;
		}
	});
}
