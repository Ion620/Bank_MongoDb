var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/bank');
router.get('/', function(req, res) {
var collection = db.get('deposit');
collection.find({}, function(err, deposit){
if (err) throw err;
res.json(deposit);
});
});

router.post('/', function(req, res){
	var collection = db.get('deposit');
	collection.insert({
		min_contribution: req.body.min_contribution,
		percent_years: req.body.percent_years,
		term_month: req.body.term_month
	}, function(err, deposit){
		if (err) throw err;
		res.json(deposit);
	});
});

module.exports = router;