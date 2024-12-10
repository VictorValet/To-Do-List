const express = require("express");
const app = express();
const { Client } = require("pg");

const db_host = "postgres";
const db_port = 5432;
const db_name = process.env.POSTGRES_DB;
const db_user = process.env.POSTGRES_USER;
const db_password = process.env.POSTGRES_PASSWORD;
const waiting_time = 3000;
let connection_attempts = 1;

const connectToDatabase = () => {
	const db = new Client({
		host: db_host,
		port: db_port,
		user: db_user,
		password: db_password,
		database: db_name,
	});
	db.connect((err) => {
		if (err) {
			console.log(`Database Connection Failed on attempt ${connection_attempts}:`, err);
			connection_attempts++;
			setTimeout(connectToDatabase, waiting_time);
		} else {
			console.log("Connected to Database");
		}
	});
}
connectToDatabase();

app.listen(5000, () => {
	console.log("Server is running on port 5000")
})
