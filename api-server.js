var express	= require('express');
var app	= express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
var mongoose = require('mongoose');
//---- Replace with real credentials -------
//mongoose.connect('mongodb://<dbuser>:<dbpassword>@mongodb_instance');
var Stock = require('./app/models/stock');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 5000;

var router = express.Router();

//----- LOG EVENTS ------------
router.use(function(req, res, next) {
	console.log('An Event');
	next();
});

//----- TEST ROUTE ------------
router.get('/', function(req, res, next){
	res.json({ message: 'TEST RESPONSE'});
});

//----- GET AND POST ROUTE ----------
router.route('/stocks')
.get(function(req, res){
	Stock.find().
		  sort('name').
		  exec( function(err, stocks){	
		if(err)
			res.send(err);
		res.json(stocks);
		});
})
.post(function(req, res, next) {
	var stock = new Stock();
	stock.name = req.body.name;

	stock.save(function(err) {
		if(err)
			res.send(err);
		res.json({ message: 'Stock created'});
	});
});

//----- GET AND PUT BY ID ROUTE ----
router.route('/stocks/:stock_id')
.get(function(req, res, next){
	Stock.findById(req.params.stock_id, function(err, stock){
		if(err)
			res.send(err);
		res.json(stock);
	});
})
.put(function(req, res, next){
	Stock.findById(req.params.stock_id, function(err, stock){
		if(err)
			res.send(err);

		stock.name = req.body.name;

		stock.save(function(err) {
			if(err)
				res.send(err);
			res.json({ message: 'Stock updated'});
		});
	});
})
.delete(function(req, res, next){
	Stock.remove({
			_id: req.params.stock_id
		}, function(err, stock) {
		if(err)
				res.send(err);
		res.json({ message: 'Stock deleted'});			
	});
});
//----- REGISTER ROUTES ----------
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
