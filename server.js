var MongoClient = require('mongodb').MongoClient;

// Connect to the db
var collection = null;

var express = require('express');
var app = express();
var ObjectID = require('mongodb').ObjectID;


app.use(express.static('./public/'));


app.get('/', function(req, res){
  res.send('hello world');
});


app.get('/get', function(req, res){

  collection.find().toArray(function(err,result)
  {
  	if (err)
  		throw err;
  	res.send(result);
  });

});

app.get('/deleteGrade/:idGrade',function(req,res){

	var grade_index = {};

	if (req.params.idGrade)
		grade_index._id = new ObjectID(req.params.idGrade);

	collection.remove(grade_index,function(err,result){
		if (err)
			throw err;
		res.send("success");
	});

});


MongoClient.connect("mongodb://ken:1234@kahana.mongohq.com:10011/grade_ken", function(err, db) {
  if(!err) {
    collection=db.collection('grade', function(err, collection) {
    console.log("We are connected port 127.0.0.1:3000");
  	
  	app.listen(3000);
    });

  }


});