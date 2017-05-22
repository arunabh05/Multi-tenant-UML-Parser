var ejs = require("ejs");
var bcrypt = require('bcrypt-nodejs');
var mysql = require('./mysql');

var registerUser = function(req, res) {
	var json_responses;

	var username = req.param("username");
	var email = req.param("email");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var pass = bcrypt.hashSync(req.param("password"));
	
	var insertUser = "insert into `CloudGrader`.`USERS` values ('"
		+ username + "','" + pass
		+ "','" + firstname + "','" + lastname + "','" + email + "'); ";

	mysql.insertData(function(err, user) {
		if (err) {
			res.status(401).send();
			throw err;
		} else {
			if (user === 1) {
				json_responses = {
				"results" : user
				};
				res.send(json_responses);
			} else {
				res.status(401).send();
			}
		}
	}, insertUser);
};

exports.registerUser = registerUser;