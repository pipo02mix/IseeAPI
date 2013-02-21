var restify = require('restify')
  , queja = require('./routes/queja');

var server = restify.createServer({
    name: 'IseeAPI'
});

server.use(restify.CORS({
    origins: ['http://isee.tiatere.es:3001'],
    headers: ['*']
}));
server.use(restify.queryParser());

//HOME
server.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Bienvindo a la prueba de la APi de ISEE \n');
});

//QUEJAS
server.get('/quejas', queja.findByCoords);
server.post('/quejas', queja.add);

server.listen(8080, function() {
  console.log('%s escuchando en %s', server.name, server.url);
});