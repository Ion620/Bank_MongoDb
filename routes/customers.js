var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/bank');
router.get('/', function(req, res) {
var collection = db.get('customers');
collection.find({}, function(err, customers){
if (err) throw err;
res.json(customers);
});
});

router.post('/', function(req, res){
	var collection = db.get('customers');
	collection.insert({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone_number: req.body.phone_number,
		address: req.body.address
	}, function(err, customers){
		if (err) throw err;
		res.json(customers);
	});
});

router.get('/:id', function(req, res) {
	var collection = db.get('customers');
	collection.findOne({ _id: req.params.id }, function(err, customers){
		if (err) throw err;
		res.json(customers);
	});
});

router.put('/:id', function(req, res){
	var collection = db.get('customers');
	collection.update({
		_id: req.params.id},
	{
		first_name: req.params.first_name,
		last_name: req.params.last_name,
		phone_number: req.params.phone_number,
		address: req.params.address
	}, function(err, customers){
		if (err) throw err;
		res.json(customers);
	});
});

router.delete('/:id', function(req, res){
	var collection = db.get('customers');
	collection.remove({ _id: req.params.id }, function(err, customers){
		if (err) throw err;
		res.json(customers);
	});
});
module.exports = router;