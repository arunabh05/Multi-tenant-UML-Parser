var async = require('async');
var fileUpload = require('express-fileupload');
var path = require('path');
var base64Img = require('base64-img');

var config = require('./config.js');
var jar = require('./config.js').jar;

var generateUML = function(req, res) {

	if(!req.files.inputFile){	
		res.send({error:"No file recieved"});
	}

	async.series([
	   function(callback) {
		   var file = req.files.inputFile;
		   file.mv(config.newLocation);
	  
		   var exec = require('child_process').exec, child;
		   child = exec(jar.jarCommand + jar.jarFile + jar.jarInput, function(err, stdout, stderr) {
			if (err !== null) {
				console.log('exec error: '+ err);
				callback(err);
			} else {
				callback(null);
			}
		  });
	}], function(err) {
		if (err) {
			console.log(err);
			res.send({
				error : "Tenant Server Error. Sequence Diagram could not be generated."
			});
		} else {
			base64Img.base64(config.imageGenerated, function(err,binaryImage) {
				res.setHeader('Content-Type', 'application/json');
				var encodedImage = {image:binaryImage};
				res.json(encodedImage);
			});
		}
	});
};

exports.generateUML = generateUML;
