var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/bank');
router.get('/', function(req, res) {
var collection = db.get('workers');
collection.find({}, function(err, customers){
if (err) throw err;
res.json(customers);
});
});

router.post('/', function(req, res){
	var collection = db.get('workers');
	collection.insert({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone_number: req.body.phone_number,
		address: req.body.address
	}, function(err, workers){
		if (err) throw err;
		res.json(workers);
	});
});

router.get('/:id', function(req, res) {
	var collection = db.get('workers');
	collection.findOne({ _id: req.params.id }, function(err, workers){
		if (err) throw err;
		res.json(workers);
	});
});

router.put('/:id', function(req, res){
	var collection = db.get('workers');
	collection.update({
		_id: req.params.id},
	{
		first_name: req.params.first_name,
		last_name: req.params.last_name,
		phone_number: req.params.phone_number,
		address: req.params.address
	}, function(err, workers){
		if (err) throw err;
		res.json(workers);
	});
});

router.delete('/:id', function(req, res){
	var collection = db.get('workers');
	collection.remove({ _id: req.params.id }, function(err, workers){
		if (err) throw err;
		res.json(workers);
	});
});
module.exports = router;