var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
	name: String,
	ticker: String,
	year1: Number,
	year2: Number,
	year3: Number,
	year4: Number,
	year5: Number	
});

module.exports = mongoose.model('Stock', StockSchema);