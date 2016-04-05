var client = require('mongodb').MongoClient;
var async = require('async');

client.connect('mongodb://localhost:27017/test', function(err, db) { 

	async.waterfall([
		(cb) => db.collection('some_documents').remove(function(err, res) { cb(err) }),
		(cb) => db.collection('some_documents').insert({ something: 'one two three' }, function(err, res) { cb(err) }),
		(cb) => db.collection('some_documents').insert({ something: 'three four five' }, function(err, res) { cb(err) }),
		(cb) => db.ensureIndex('some_documents', { 'something': 'text' }, function(err, res) { cb(err) }),
		(cb) => db.collection('some_documents').find( { $text: { $search: 'four' } }).toArray(function(err, res) { cb(err, res) }),
		(res, cb) => {
			console.log(res);
			cb();
		},
		], function(err) {
			if (err) {
				console.error(err);
			}

			db.close();
		});
});