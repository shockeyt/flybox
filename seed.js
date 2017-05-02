var db = require('./models');

db.Fly.remove({}, function(err, flies) {
	if (err) {
		console.log("Error: ", err);
	}
	console.log("removed all flies");
});

var flyPatterns = [
	{
		name: "Elk Hair Caddis",
		color: "tan",
		size: 18,
		species: "Caddis",
		picture: "http://www.orvis.com/orvis_assets/prodimg/1X2ASF10.jpg"
	},
	{
		name: "The Copper John",
		color: "red",
		size: 20,
		species: "Nymph",
		picture: "http://www.orvis.com/orvis_assets/prodimg/12CY2Wcop.jpg"
	},
	{
		name: "Pheasant Tail",
		color: "brown",
		size: 18,
		species: "Mayfly",
		picture: "http://www.orvis.com/orvis_assets/prodimg/0434W2olive.jpg"
	},
	{
		name: "Barr's Emerger",
		color: "yellow_brown",
		size: 20,
		species: "Mayfly",
		picture: "http://www.orvis.com/orvis_assets/prodimg/02Q0L2W.jpg"
	},
];

db.Fly.create(flyPatterns, function(err, flies) {
	if (err) {
		console.log("Error: ", err);
	} else {
		console.log("Created new flies ", flies);
		process.exit();
	}
});