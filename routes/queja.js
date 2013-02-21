var mongoose = require('mongoose')
,   SEARCH_DISTANCE = 10/111.12;

var QuejaSchema = mongoose.Schema({ 
        title: String,
        description: String,
        createdAt: { type: Date, default: Date.now },
        comments: [{ body: String, date: Date }],
        votes: [{ _iduser: mongoose.Schema.Types.ObjectId, date: Date }],
        state: { type: String, enum: ['pendiente', 'atendido', 'solucionado', 'descartado']},
        owner: String ,
        category: { type: String, enum: ['seguridad', 'deterioro', 'trafico', 'limpieza', 'molestias', 'otros']},
        image: { type: String },
        watchers: [{ _iduser: mongoose.Schema.Types.ObjectId }],
        coords: {
            type: [Number, Number],
            index : '2d'
        }
    });
    
var Queja = mongoose.model('Queja', QuejaSchema);


mongoose.connect('mongodb://localhost/local');


exports.findByCoords = function(req, res){
  console.log(req.params.lon, req.params.lat);
  
  Queja.find({"coords" : {$near : [ req.params.lat, req.params.lon ] , $maxDistance : SEARCH_DISTANCE}})
    .exec(function(err, quejas){
        if (err) console.log(err);
        res.send(quejas);
    });
};

exports.add = function(req, res) {
    var queja = new Queja(req.body);
    
    console.log('Adding queja: ' + JSON.stringify(queja));
    
    queja.save(function(err){
        if (err) console.log(err);
        console.log("guardado");
        res.send(JSON.stringify(queja));
    });
}