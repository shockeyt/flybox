var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlySchema = new Schema({
	name: String,
	color: String,
	size: Number,
	species: String,
	picture: String
});

var Fly = mongoose.model('Fly', FlySchema);
module.exports = Fly;