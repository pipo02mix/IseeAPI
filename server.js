var http = require('http')
  , routes = require('./routes/queja')
  , express = require('express');
 
var app = express();
 
 
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
}); 
 
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bienvindo a la prueba de la APi de ISEE \n');
});
app.get('/quejas', routes.queja);
app.post('/quejas', routes.addQueja);

http.createServer(app).listen(3000, function(){
    console.log("Listen in port");
});