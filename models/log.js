/* Mongoose - Comment */
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var LogSchema   = new Schema({
	clicks: [Schema.Types.Mixed],
	manifest: String,
	email: String,
	age: String,
	gender: String,
	country: String,
	city: String,
	comment: String,
	explain: String,
	circles: { 
		first_answer: { type: Number, min: 0, max: 7, default: 0 }, 
		second_answer: { type: Number, min: 0, max: 7, default: 0 }, 
		third_answer: { type: Number, min: 0, max: 7, default: 0 } 
	}
});
LogSchema.plugin(timestamps);

module.exports = {
	log: mongoose.model('Log', LogSchema),
	schema: LogSchema
}