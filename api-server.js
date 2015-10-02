var express	= require('express');
var app	= express();
var bodyParser = require('body-parser');
var cors = require('cors');
var seeder = require('./app/seeder');

app.use(cors());
var mongoose = require('mongoose');
//---- Replace with real credentials -------
//mongoose.connect('mongodb://<dbuser>:<dbpassword>@mongodb_instance');
//---- Local dev instance
mongoose.connect('mongodb://localhost/api');

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
	console.log('TEST RESPONSE');
});

//----- GET AND POST ROUTE ----------
router.route('/stocks')
.get(function(req, res){
	Stock.find().
		  sort('name').
		  exec( function(err, stocks){	
		if(err) {
			res.send(err);
		}
		if(stocks.length === 0) {
			seeder.init();
		}
		res.json(stocks);
		});
})
.post(function(req, res, next) {
	var stock = new Stock();
console.log('req', req);
	stock.name = req.body.data.name;
	stock.ticker = req.body.data.ticker;
	stock.year1 = req.body.data.year1;
	stock.year2 = req.body.data.year2;
	stock.year3 = req.body.data.year3;
	stock.year4 = req.body.data.year4;
	stock.year5 = req.body.data.year5;

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

		stock.name = req.body.data.name;
		stock.ticker = req.body.data.ticker;
		stock.year1 = req.body.data.year1;
		stock.year2 = req.body.data.year2;
		stock.year3 = req.body.data.year3;
		stock.year4 = req.body.data.year4;
		stock.year5 = req.body.data.year5;

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
