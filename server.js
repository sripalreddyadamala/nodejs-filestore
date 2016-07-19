

var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("contactlist", ["contactlist"]);
var bodyParser = require("body-parser");

// File upload related
var Grid    = require('gridfs-stream');
var fs      = require('fs');

var gfs = Grid(db, mongojs);


var PORT = process	.env.PORT || 3000;

app.use(bodyParser.json());

app.all('/', function(req, resp){
	resp.send('<h1>Hi this is meanstack</h1>');
});


// Getting all the collections from MongoDB
app.get('/api/collections/', function(req, resp){
	console.log('/api/collections/ GET called');

	db.contactlist.find(function(err, docs){
		console.log('Response: ', docs);
		resp.json(docs);
	});
});

// Getting collection by name from the MongoDB
app.get('/api/collections/:fileId', function(req, resp){
	var fileId = req.params.fileId;
	console.log('/api/collections/:fileId called'+fileId);

	db.contactlist.findOne({_id: mongojs.ObjectId(fileId)}, function(err, doc){
		console.log('Response: ', doc);
		resp.json(doc);
	});
});

app.post('/api/collections/', function(req, resp){
	console.log('/api/collections/ POST is called');

	db.contactlist.insert(req.body, function(err, doc){
		console.log('Response: ', doc);
		resp.json(doc);
	});
});

app.delete('/api/collections/:fileId', function(req, resp){
	var fileId = req.params.fileId;
	console.log('/api/collections/ DELETE is called '+ fileId);

	db.contactlist.remove({_id: mongojs.ObjectId(fileId)}, function(err, doc){
		console.log('Response: ', doc);
		resp.json(doc);
	});
});

app.put('/api/collections/:fileId', function(req, resp){
	var fileId = req.params.fileId;
	console.log('/api/collections/ UPDATE is called '+ fileId);

	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(fileId)},
		update: {$set: req.body},
		new: true
		}, function(err, doc){
			console.log('Response: ', doc);
			resp.json(doc);
	});
});


// Uploading a file to the MongoDB
app.post('/api/collections/upload', function(req, res) {

	console.log('Upload ');

    var tempfile    = req.files.filename.path;
    var origname    = req.files.filename.name;
    var writestream = gfs.createWriteStream({ filename: origname });
    // open a stream to the temporary file created by Express...
    fs.createReadStream(tempfile)
      .on('end', function() {
        res.send('OK');
      })
      .on('error', function() {
        res.send('ERR');
      })
      // and pipe it to gfs
      .pipe(writestream);
});

// Downloading a file from the MongoDB
app.get('/api/collections/download', function(req, res) {
    // TODO: set proper mime type + filename, handle errors, etc...
    gfs
      // create a read stream from gfs...
      .createReadStream({ filename: req.param('filename') })
      // and pipe it to Express' response
      .pipe(res);
});

app.listen(PORT, function(){
	console.log('Server is running on port: '+PORT);
});