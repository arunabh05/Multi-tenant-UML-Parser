var request = require('request');
var fs = require('fs');
var mysql = require('./mysql');
var config = require('./config');

exports.generateUML = function(req, res) {
	var IP = config.loadbalancer.IP
	var port = config.loadbalancer.Port;
	var URL = '/' + req.param("tenant") + '/generateUML';

	var formData = {
		inputFile : fs.createReadStream(req.files.file.path),
		fileName : req.files.file.name
	};

	request.post({
		url : IP + port + URL,
		formData : formData
	}, function Callback(err, httpResponse, body) {
		if (err) {
			res.send({
				error : "Tenant Server not responding."
			});
		} else {
			var imageData = JSON.parse(httpResponse.body);
			imageData = imageData.image;
			res.status(200).send({
				image : imageData
			});
		}
	});
};

exports.grade = function(req, res){
	var tenant = req.param('tenant');
	var studentID = req.param('studentID');
	var score = req.param('score');
	var comments = req.param('comments');
	var user = req.session.username;
	
	var insertUser = "insert into TENANT_DATA (TENANT_ID, TENANT_TABLE, COLUMN_1, COLUMN_2, COLUMN_3, COLUMN_4) " +
			"values ('" + tenant + "', 'Grades' , " + studentID + "," + score + ",'" + comments + "','" + user +"');"
			
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

exports.records = function(req, res){

	var user = req.session.username;
	var getRecords = "select * from TENANT_DATA where COLUMN_4='"+user+"';"
	var tenant1 = [];
	var tenant2 = [];
	var tenant3 = [];
	var tenant4 = [];
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			res.status(500).send();
		} else {
			if (results.length > 0) {
				results.forEach(function(record){
					if(record.TENANT_ID === 'tenant4'){
						tenant4.push(record);
					}else if(record.TENANT_ID === 'tenant3' ){
						tenant3.push(record);
					}else if(record.TENANT_ID === 'tenant2'){
						tenant2.push(record);
					}else{
						tenant1.push(record);
					}
				});
				
				res.status(200).send({tenant1 : tenant1,
									tenant2 : tenant2,
									tenant3 : tenant3,
									tenant4 : tenant4
					});
			} else {
				res.status(401).send({user : ''});					
			}
		}
	}, getRecords);
};
