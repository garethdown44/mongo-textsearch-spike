var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/test', function(err, db) {

	var coll = db.collection('test');

	coll.insert({ something: 'hello there this is a test' });

	db.close();
});