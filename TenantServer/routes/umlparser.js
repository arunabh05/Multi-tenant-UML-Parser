var async = require('async');
var path = require('path');
var base64Img = require('base64-img');
var fs = require('fs');
var config = require('./config.js');

var generateUML = function(req, res) {

	if(!req.files.inputFile){
		res.send({error : "No file recieved"});
	}

	var file = req.files.inputFile;
	var fileName = req.body.fileName;
	
	fs.renameSync(file.path, config.newLocation + fileName);
 	fs.chmodSync(config.newLocation + fileName, 0777);	
	async.series([
           function(callback) {				
  		var spawn = require("child_process").spawn;
		var exec = require('child_process').exec, child;
           	child = exec(config.python.Command + config.newLocation + fileName + ' ' + config.python.outputFile, function(error, stdout, stderr) {
           		if (error !== null) {
                		console.log('exec error: '+ error);
                        	callback(error);
                	} else {
                        	callback(null);
                	}   
        	});
	} ], function(err) {
		if (err) {
			res.send({
				error : "Tenant Server Error. Sequence Diagram could not be generated."
			});
		} else {
			base64Img.base64(config.python.outputFile, function(err,binaryImage) {
				res.setHeader('Content-Type', 'application/json');
				var encodedImage = {image:binaryImage};
				res.json(encodedImage);
			});
		}
	});
};

exports.generateUML = generateUML;