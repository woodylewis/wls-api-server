var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Stock', StockSchema);