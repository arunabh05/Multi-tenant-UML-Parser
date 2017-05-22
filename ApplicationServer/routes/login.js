var ejs = require("ejs");
var mysql = require('./mysql');
var bcrypt = require("bcrypt-nodejs");

var afterLogin = function(req, res) {
	var pass = req.param("password");
	var username = req.param("username");
	
	var getUser = "select * from USERS where USERNAME='" + username + "';";
	
	mysql.fetchData(function(err, results) {
		if (err) {
			res.status(500).send();
			throw err;
		} else {
			if (results.length > 0) {
				if (bcrypt.compareSync(pass, results[0].PASSWORD)) {
						req.session.username = results[0].USERNAME;
						res.status(200).send({user : results[0].USERNAME});
					} else {
						res.status(401).send({user : ''});					
					}
				}else{
					res.status(401).send({user : ''});					
				}
		}
	}, getUser);
};

exports.afterLogin = afterLogin;