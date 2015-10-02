'use strict';

var mongoose = require('mongoose');
var Stock = require('./models/stock');

module.exports = {
	init: function() {
		var stock = new Stock({
			name: 'Alpha',
			ticker: 'ALPHA',
			year1: 2500,
			year2: 3200,
			year3: 3700,
			year4: 4500,
			year5: 5200
		});

		stock.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Stock created'});
		});
	}
};