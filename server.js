var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


app.get('/api', function api_index (req, res) {
	res.json({message: "server running"});
});




//****REST ROUTES****

//get index
app.get('/flies', function (req, res) {
	db.Fly.find()
	.exec(function(err, flies) {
		if (err) {return console.log("index error:" + err);}
		res.json(flies);
	});
});

//get show
app.get('/flies/:id', function (req, res) {
	db.Fly.findOne({_id: req.params.id}, function(err, fly) {
		console.log(req.params.id);
		res.json(fly);
	});
});

//post
app.post('/flies', function (req, res) {
	var newFly = new db.Fly({
		name: req.body.name,
		color: req.body.color,
		size: req.body.size,
		species: req.body.species,
		picture: req.body.picture
	});
	newFly.save(function (err, fly) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", fly);
		res.json(fly);
	});
});

//delete
app.delete('/flies/:id', function (req, res) {
	var id = req.params.id;
	db.Fly.findOneAndRemove({_id: id}, function (err, deletedFly) {
		console.log("deleted ", deletedFly);
		res.json(deletedFly);
	});
});

//update
app.put('/flies/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.Fly.findOne({_id: id}, function (err, updatedFly) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.name) updatedFly.name = req.body.name;
		if (req.body.color) updatedFly.color = req.body.color;
		if (req.body.size) updatedFly.size = req.body.size;
		if (req.body.species) updatedFly.species = req.body.species;
		if (req.body.picture) updatedFly.picture = req.body.picture;

		updatedFly.save(function(err) {
			if (err) res.json({message: 'could not update'});
			console.log('updated ', updatedFly);
			res.json({message: 'Fly updated'});
		});
	});
});








app.listen(process.env.PORT || 3000, function() {
	console.log("express server running on localhost:3000");
});