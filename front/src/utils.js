export function getRowCssClass(task, index) {
	const evenOdd = index % 2 === 0 ? "even" : "odd";
	let cssClass = "";
	if (task.status === "completed") {
		cssClass = `${task.status}-${evenOdd} `;	
	}
	return cssClass;
}
