const bodyParser = require("body-parser");
const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 5000;

const DB_HOST = "postgres";
const DB_PORT = 5432;
const DB_NAME = process.env.POSTGRES_DB;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
const RESPONSE_DELAY = 3000;
const TABLE_NAME = "tasks";

let connectionAttempts = 1;
let db = null;

const connectToDatabase = () => {
	db = new Client({
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
	});
	db.connect((err) => {
		if (err) {
			console.log(`Database Connection Failed on attempt ${connectionAttempts}:`, err);
			connectionAttempts++;
			setTimeout(connectToDatabase, RESPONSE_DELAY);
		} else {
			console.log("Connected to Database");
			createDatabaseTable();
		}
	});
}

const createDatabaseTable = () => {
	console.log("Creating database table")

	let query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description VARCHAR,
		status VARCHAR(10) NOT NULL CHECK (status IN ('pending', 'completed', 'overdue')) DEFAULT 'pending',
		due_date DATE NOT NULL,
		priority SMALLINT NOT NULL CHECK (priority IN (3, 2, 1))
	)`;

	db.query(query, (err) => {
		if (err) {
			console.error("Database Creation Error:", err);
		} else {
			console.log(`Successfully Created Table - ${TABLE_NAME}`)
		}
	})
}
connectToDatabase();

app.use(express.static('front/build'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const updateOverdueTasks = () => {
	const queryUpdate = `
		UPDATE ${TABLE_NAME} SET status = 'overdue' 
		WHERE due_date < CURRENT_DATE AND status = 'pending'
	`;
	db.query(queryUpdate);
}

app.get("/api/getTasks", (req, res) => {
	try {
		updateOverdueTasks();
	} catch(err) {
		console.error(err);
		res.status(500).send(err);
		return ;
	}
	
	const querySelect = `SELECT * FROM ${TABLE_NAME} ORDER BY id`;
	db.query(querySelect, (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send(err);
		} else {
			res.send(result.rows);
		}
	});
})

app.post("/api/createTask", (req, res) => {
	const { name, description, dueDate, priority } = req.body;
	const query = `
		INSERT INTO ${TABLE_NAME} (name, description, due_date, priority) 
		VALUES ($1,$2,$3,$4)
	`;
	db.query(query, [name, description, dueDate, priority], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			res.send(result);
		}
	});
})

app.post("/api/updateTaskStatus", (req, res) => {
	const { id, status } = req.body;
	const query = `UPDATE ${TABLE_NAME} SET status=$1 WHERE id=$2`;
	db.query(query, [status, id], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			res.send(result);
		}	
	});
})

app.delete("/api/deleteTask", (req, res) => {
	const { id } = req.body;
	const query = `DELETE FROM ${TABLE_NAME} WHERE id=$1`;
	db.query(query, [id], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).send(error);
		} else {
			res.send(result);
		}
	});
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})
