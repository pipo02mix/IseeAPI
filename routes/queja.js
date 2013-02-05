
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("database open");
});

/*var mongo = require('mongodb');


var Server = mongo.Server
  , Db = mongo.Db
  , BSON = mongo.BSONPure;  


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('test', server);
 
/*db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    } else {
        console.log(err);
    }
});*/

var schema = mongoose.Schema({ 
        title: String,
        loc: {
            type: [Number, Number],
            index : '2d'
        }
    });
    
var Queja = mongoose.model('Queja', schema);

exports.queja = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  
  Queja.find({"loc" : {$near : [ 41.12, 0.122 ] , $maxDistance : 10/111.12}})
    .exec(function(err, quejas){
        if (err) console.log(err);
        res.send(quejas);
    });
  
  /*db.collection('test', function(err, collection) {
        collection.find({"loc" : {$near : [ 41.12, 0.122 ] , $maxDistance : 10/111.12}}).toArray(function(err, items) {            
            res.send(items);
        });
    });*/
};

exports.addQueja = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var queja = new Queja(req.body);
    
    console.log('Adding queja: ' + JSON.stringify(queja));
    
    queja.save(function(err){
        if (err) console.log(err);
        console.log("guardado");
        res.send(JSON.stringify(queja));
    });
    
    /*db.collection('test', function(err, collection) {
        collection.insert(queja, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });*/
}