var ejs = require('ejs');
var mysql = require('mysql');
var config = require('./config.js');

function getConnection() {
	var connection = mysql.createConnection({
		host : config.mysql.url,
		user : config.mysql.user,
		password : config.mysql.password,
		database : config.mysql.database,
		port : config.mysql.port
	});
	return connection;	
}

function fetchData(callback, sqlQuery) {
	var conn = getConnection();
	conn.query(sqlQuery, function(err, rows, fields) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			callback(err, rows);
		}
	});
	conn.end();
}

function insertData(callback, sqlQuery) {
	console.log("\nSQL Query::" + sqlQuery);
	var conn = getConnection();
	conn.query(sqlQuery, function(err, result) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			result = 1;
			console.log("DB Results:" + result);
			callback(err, result);
		}
	});
	conn.end();
}

exports.insertData = insertData;
exports.fetchData = fetchData;